const express = require('express')
const { registrationController, loginController, refreshController, logoutController } = require('../controllers/authenticationController')
const router = express.Router()

router.post('/register', async (req, res) => registrationController(req, res))
router.post('/login', async (req, res) => loginController(req, res))
router.get('/logout/:id', async (req, res) => logoutController(req, res))
router.post('/refresh', async (req, res) => refreshController(req, res))

module.exports = router
