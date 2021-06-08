const express = require('express')
const passport = require('passport')
const { registrationController, loginController, accessTestController } = require('../controllers/authenticationController')
const router = express.Router()

router.post('/register', async (req, res) => registrationController(req, res))
router.post('/login', async (req, res) => loginController(req, res))
router.get('/testAccess', passport.authenticate('jwt', { session: false }), (req, res) =>
  accessTestController(req, res)
)

module.exports = router
