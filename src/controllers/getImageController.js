const path = require('path')
const fs = require('fs')
const ImageModel = require('../models/Image')

const getImageController = async (req, res) => {
  const { name } = req.params
  const isImage = await ImageModel.findOne({
    where: {
      user_id: req.user.id,
      name: name
    }
  })

  if (isImage) {
    const imageExists = fs.existsSync(path.join(__dirname, '../../', isImage.src))
    if (imageExists) {
      res.sendFile(isImage.src, {
        root: path.join(__dirname, '../../')
      })
    } else {
      res.status(404).json({ message: 'Not Found' })
    }
  } else {
    res.status(404).json({ message: 'Not Found' })
  }
}

module.exports = getImageController
