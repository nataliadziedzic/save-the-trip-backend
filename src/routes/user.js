const express = require('express')
const router = express.Router()
const passport = require('passport')
const { updateUserLanguageController, findUser } = require('../controllers/userController')

router.patch('/preferred-language/:id', passport.authenticate('jwt', { session: false }), findUser, (req, res) =>
  updateUserLanguageController(req, res)
)

module.exports = router
