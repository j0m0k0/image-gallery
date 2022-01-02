const ImageModel = require('../models/Image')
const fs = require('fs')

const listOfImages = async (req, res) => {
  // filter images and return the url of images that uploaded by requested user
  const imagesUploadedByUser = await ImageModel.findAll({
    where: {
      user_id: req.user.id
    }
  })

  const result = []

  await imagesUploadedByUser.map((image) => result.push({ id: image.id, src: req.protocol + '://' + req.get('host') + '/' + image.src }))

  // console.log(imagesUploadedByUser)
  res.json(result)
}

const addImageToGallery = async (req, res) => {
  // console.log('file is', req.file)
  if (req.fileValidationError !== undefined) {
    res.status(403).json({ message: req.fileValidationError })
    return
  }
  if (req.file) {
    console.log(req.file)
    const newImage = await ImageModel.create({
      user_id: req.user.id,
      src: req.file.path,
      name: req.file.filename
    })

    if (newImage) {
      res.json({ message: 'فایل دریافت شد', imageId: newImage.id })
    } else {
      res.status(403).json({ message: 'فایل دریافت نشد' })
    }
  } else {
    res.status(403).json({ message: 'فایل دریافت نشد' })
  }
}

const removeImageFromGallery = async (req, res) => {
  // receives an image id
  // checks if the image id belongs to the requested user
  // if yes, deletes the image
  // otherwise, returns 403
  const { imageId } = req.body
  if (imageId === undefined) {
    res.status(403).json({ message: 'باید تصویری برای حذف انتخاب کنید' })
    return
  }
  const isImage = await ImageModel.findOne({
    where: {
      id: imageId,
      user_id: req.user.id
    }
  })

  if (isImage) {
    await fs.unlink(isImage.src, (err) => {
      if (err) { res.status(403).json('failed to delete image') }
    })
    await ImageModel.destroy({
      where: {
        id: imageId,
        user_id: req.user.id
      }
    })
    res.json({ message: 'تصویر حذف شد' })
  } else {
    res.status(403).json({ message: 'تصویری یافت نشد' })
  }
}

module.exports = listOfImages
module.exports.add = addImageToGallery
module.exports.remove = removeImageFromGallery
