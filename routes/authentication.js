const express = require('express')
const { registrationController, loginController, refreshController } = require('../controllers/authenticationController')
const router = express.Router()

router.post('/register', async (req, res) => registrationController(req, res))
router.post('/login', async (req, res) => loginController(req, res))
router.post('/refresh', async (req, res) => refreshController(req, res))

module.exports = router
