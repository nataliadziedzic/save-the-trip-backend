const express = require('express')
const { registrationController, loginController } = require('../controllers/authenticationController')
const router = express.Router()

router.post('/register', async (req, res) => registrationController(req, res))
router.post('/login', async (req, res) => loginController(req, res))

module.exports = router
