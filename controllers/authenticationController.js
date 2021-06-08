const getDb = require('../config/database')
const bcrypt = require('bcryptjs')

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
      const isPasswordCorrect = await bcrypt.compare(password, rows[0].password)
      isPasswordCorrect ? res.status(200) : res.status(401).json({ message: 'Invalid password' })
    }
  } catch (error) {
    console.log(error)
  }
}
