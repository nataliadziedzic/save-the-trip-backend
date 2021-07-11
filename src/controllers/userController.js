const getDb = require('../../config/database')

exports.updateUserLanguageController = async (req, res) => {
  const db = await getDb()
  const userId = res.user.id
  const { preferredLanguage } = req.body
  try {
    if (preferredLanguage) {
      await db.query('UPDATE users SET preferredLanguage = ? WHERE id = ?', [preferredLanguage, userId])
      res.status(200).json({ message: 'Updated successfully' })
    } else res.status(400).json({ message: 'Bad request' })
  } catch (error) {
    res.status(500).json({ message: error.message })
    process.exit(1)
  }
}

exports.findUser = async (req, res, next) => {
  const db = await getDb()
  let user
  try {
    const dbUser = await db.query('SELECT * FROM users WHERE id = ?', [req.params.id])
    if (dbUser[0].length === 0) {
      return res.status(404).json({ message: 'Cannot find user' })
    }
    user = dbUser[0][0]
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
  res.user = user
  next()
}
