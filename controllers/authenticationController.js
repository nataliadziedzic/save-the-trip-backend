const getDb = require('../database/database')
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
