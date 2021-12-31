const ImageModel = require('../models/Image')

const listOfImages = async (req, res) => {
  // filter images and return the url of images that uploaded by requested user
  res.send('List')
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
      res.json({ message: 'File received' })
    } else {
      res.status(403).json({ message: 'File not received' })
    }
  } else {
    res.status(403).json({ message: 'File not received' })
  }
}

const removeImageFromGallery = (req, res) => {
  res.send('Remove')
}

module.exports = listOfImages
module.exports.add = addImageToGallery
module.exports.remove = removeImageFromGallery
