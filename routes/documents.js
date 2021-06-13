const express = require('express')
const router = express.Router()
const passport = require('passport')
const {
  getDocumentsForTripController,
  updateDocumentsController,
  findDocuments,
} = require('../controllers/documentsController')

router.get('/:id', passport.authenticate('jwt', { session: false }), findDocuments, (req, res) =>
  getDocumentsForTripController(req, res)
)

router.put('/:id', passport.authenticate('jwt', { session: false }), findDocuments, (req, res) =>
  updateDocumentsController(req, res)
)

module.exports = router
