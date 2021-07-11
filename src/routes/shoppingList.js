const express = require('express')
const router = express.Router()
const passport = require('passport')
const {
  createShoppingItemController,
  findItem,
  updateItemController,
  deleteItemController,
  getItemsController,
} = require('../controllers/shoppingListController')

router.get('/:tripId', passport.authenticate('jwt', { session: false }), (req, res) => getItemsController(req, res))

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => createShoppingItemController(req, res))

router.put('/', passport.authenticate('jwt', { session: false }), (req, res) =>
  updateItemController(req, res)
)

router.delete('/:id', passport.authenticate('jwt', { session: false }), findItem, (req, res) =>
  deleteItemController(req, res)
)

module.exports = router
