if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const getDb = require('../config/database')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.registrationController = async (req, res) => {
  const { username, email, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)
  const db = await getDb()
  try {
    const [rows, fields] = await db.query('SELECT email FROM users WHERE email = ?', [email])
    if (rows.length > 0) {
      return res.status(409).json({ message: 'User with this email already exist.' })
    } else {
      await db.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [
        username,
        hashedPassword,
        email,
      ])
      res.status(201).json({ message: 'User created.' })
    }
  } catch (error) {
    console.log(error)
  }
}

exports.loginController = async (req, res) => {
  const { email, password } = req.body
  const db = await getDb()
  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide an email and a password.' })
    }
    const [rows, fields] = await db.query('SELECT * FROM users WHERE email = ?', [email])
    if (rows.length === 0) return res.status(404).json({ message: "Account doesn't exist" })
    if (rows[0].email === email) {
      const user = rows[0]
      const isPasswordCorrect = await bcrypt.compare(password, user.password)
      if (isPasswordCorrect) {
        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)
        await db.query(
          `UPDATE users
           SET refreshToken = ?
           WHERE id = ?`,
          [refreshToken, user.id]
        )
        res.status(200).json({
          accessToken,
          refreshToken,
          user: {
            id: user.id,
            username: user.username,
          },
        })
      } else res.status(401).json({ message: 'Invalid password' })
    }
  } catch (error) {
    console.log(error)
  }
}

exports.refreshController = async (req, res) => {
  const db = await getDb()
  const { refreshToken } = req.body
  try {
    if (!refreshToken) return res.status(401).json({ message: 'Unauthorized' })
    if (!(await db.query('SELECT * FROM users WHERE refreshToken = ?', [refreshToken])))
      return res.status(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
      if (error) return res.status(403).json({ message: 'Forbidden' })
      const accessToken = generateAccessToken(user)
      return res
        .status(200)
        .json({ accessToken: accessToken, user: user.id, username: user.username })
    })
  } catch (error) {
    console.log(error)
  }
}

const generateAccessToken = user => {
  return jwt.sign({ id: user.id, username: user.username }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '30s',
  })
}
const generateRefreshToken = user => {
  return jwt.sign({ id: user.id, username: user.username }, process.env.REFRESH_TOKEN_SECRET)
}
