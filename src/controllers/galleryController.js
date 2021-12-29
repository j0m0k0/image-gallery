const listOfImages = (req, res) => {
  res.send('List')
}

const addImageToGallery = (req, res) => {
  res.send('Add')
}

const removeImageFromGallery = (req, res) => {
  res.send('Remove')
}

module.exports = listOfImages
module.exports.add = addImageToGallery
module.exports.remove = removeImageFromGallery
