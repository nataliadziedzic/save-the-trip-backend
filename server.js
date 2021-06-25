if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const cors = require('cors')
const passport = require('passport')
const initializePassport = require('./config/passport.config')
const getDb = require('./config/database')

const app = express()
app.use(express.json())

initializePassport(passport)

const allowedOrigins = ['http://localhost:3000']
app.use(
  cors({
    origin: allowedOrigins,
  })
)

const connectToDatabase = async () => {
  const db = await getDb()
  try {
    await db.connect()
    console.log('Connected to db')
  } catch (error) {
    console.log(error)
  }
}
connectToDatabase()

const authRouter = require('./routes/authentication')
app.use('/', authRouter)

const tripsRouter = require('./routes/trips')
app.use('/', tripsRouter)

const documentsRouter = require('./routes/documents')
app.use('/documents', documentsRouter)

const imagesRouter = require('./routes/images')
app.use('/images', imagesRouter)

app.listen(process.env.PORT || 5000, () => {
  console.log(`Running`)
})
