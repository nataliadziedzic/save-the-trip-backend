const express = require('express')
const { registrationController } = require('../controllers/authenticationController')
const router = express.Router()

router.post('/register', async (req, res) => registrationController(req, res))

module.exports = router
