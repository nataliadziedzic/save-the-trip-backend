if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const cors = require('cors')
const passport = require('passport')
const initializePassport = require('../config/passport.config')

const app = express()
app.use(express.json())

initializePassport(passport)

const allowedOrigins = ['http://localhost:3000', 'https://save-the-trip-frontend.herokuapp.com'] 
app.use(
  cors({
    origin: allowedOrigins,
  })
)

const authRouter = require('./routes/authentication')
app.use('/', authRouter)

const tripsRouter = require('./routes/trips')
app.use('/', tripsRouter)

const documentsRouter = require('./routes/documents')
app.use('/documents', documentsRouter)

const imagesRouter = require('./routes/images')
app.use('/images', imagesRouter)

const shoppingRouter = require('./routes/shoppingList')
app.use('/shopping-item', shoppingRouter)

const userRouter = require('./routes/user')
app.use('/', userRouter)

app.listen(process.env.PORT || 5000, () => {
  console.log(`Running`)
})
