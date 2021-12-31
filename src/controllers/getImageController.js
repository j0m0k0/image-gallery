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
    console.log('found!', isImage.src)
    res.sendFile(isImage.src, {
      root: './'
    })
  } else {
    res.status(404).json({ message: 'Not Found' })
  }
}

module.exports = getImageController
