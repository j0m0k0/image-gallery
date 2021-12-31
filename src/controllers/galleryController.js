const listOfImages = (req, res) => {
  res.send('List')
}

const addImageToGallery = (req, res) => {
  // console.log('file is', req.file)
  if (req.fileValidationError !== undefined) {
    res.status(403).json({ message: req.fileValidationError })
    return
  }
  if (req.file) {
    res.json({ message: 'File received' })
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
