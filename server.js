if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const port = 5000

const cors = require('cors')
const allowedOrigins = ['http://localhost:3000']
app.use(
  cors({
    origin: allowedOrigins,
  })
)

app.listen(process.env.PORT || port, () => {
  console.log(`Running at http://localhost:${port}`)
})
