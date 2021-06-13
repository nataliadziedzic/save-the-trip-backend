const express = require('express')
const router = express.Router()
const passport = require('passport')
const { getTripsController, createTripController } = require('../controllers/tripsController')

router.get('/user/:userId/trips', passport.authenticate('jwt', { session: false }), (req, res) =>
  getTripsController(req, res)
)
router.post('/trips', passport.authenticate('jwt', { session: false }), (req, res) =>
  createTripController(req, res)
)

module.exports = router
