const express = require('express')
const router = express.Router()
const passport = require('passport')
const {
  getTripsController,
  getSingleTripController,
  createTripController,
  updateTripController,
  deleteTripController,
  findTrip,
} = require('../controllers/tripsController')


router.get('/user/:userId/trips', passport.authenticate('jwt', { session: false }), (req, res) =>
  getTripsController(req, res)
)

router.get('/trip/:id', passport.authenticate('jwt', { session: false }), findTrip, (req, res) =>
  getSingleTripController(req, res)
)

router.post('/trips', passport.authenticate('jwt', { session: false }), (req, res) => createTripController(req, res))

router.patch('/trip/:id', passport.authenticate('jwt', { session: false }), findTrip, (req, res) =>
  updateTripController(req, res)
)

router.delete('/trip/:id', passport.authenticate('jwt', { session: false }), findTrip, (req, res) =>
  deleteTripController(req, res)
)

module.exports = router
