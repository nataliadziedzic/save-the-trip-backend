const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const { uploadFile, getFileStream } = require('../s3')

exports.getImageController = async (req, res) => {
  const key = req.params.key
  try {
    const readStream = await getFileStream(key)
    readStream.pipe(res)
  } catch (error) {
    res.status(500).json({ message: error.message })
    process.exit(1)
  }
}

exports.uploadImageController = async (req, res) => {
  const file = req.file
  try {
    const uploadedImage = await uploadFile(file)
    unlinkFile(file.path)
    res.status(200).send({ url: `/images/${uploadedImage.Key}` })
  } catch (error) {
    res.status(500).json({ message: error.message })
    process.exit(1)
  }
}
