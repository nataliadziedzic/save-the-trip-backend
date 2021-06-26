async function getDb() {
  const mysql = require('mysql2/promise')
  try {
    const db = await mysql.createConnection({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
    })
    return db
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = getDb
