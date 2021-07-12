async function getDb() {
  const mysql = require('mysql2/promise')
  try {
    const pool = await mysql.createPool({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
    })
    return pool
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = getDb
