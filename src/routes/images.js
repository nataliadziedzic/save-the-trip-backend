const express = require('express')
const router = express.Router()
const passport = require('passport')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const { uploadImageController, getImageController } = require('../controllers/imagesController')

router.get('/:key', (req, res) => getImageController(req, res))

router.post('/', passport.authenticate('jwt', { session: false }), upload.single('image'), (req, res) =>
  uploadImageController(req, res)
)

module.exports = router