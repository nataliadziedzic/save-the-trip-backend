if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const mysql = require('mysql2')

const app = express()
app.use(express.json())

const cors = require('cors')
const allowedOrigins = ['http://localhost:3000']
app.use(
  cors({
    origin: allowedOrigins,
  })
)

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
})

db.connect((err) => {
  if (err) throw err
  console.log('Connected to a database!')
})

app.listen(process.env.PORT || 5000, () => {
  console.log(`Running`)
})
