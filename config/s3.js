if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const S3 = require('aws-sdk/clients/s3')
const sharp = require('sharp')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
})

const uploadFile = async file => {
  const image = await sharp(file.path).resize({ width: 500 }).toBuffer()
  const uploadParams = {
    Bucket: bucketName,
    Body: image,
    Key: file.filename,
  }
  return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile

const getFileStream = key => {
  const downloadParams = {
    Key: key,
    Bucket: bucketName,
  }
  return s3.getObject(downloadParams).createReadStream()
}
exports.getFileStream = getFileStream
