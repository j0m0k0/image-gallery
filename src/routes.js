const express = require('express')
const router = express.Router()
const registerController = require('./controllers/registerController')
const galleryController = require('./controllers/galleryController')
const { login, createJwtForUser } = require('./controllers/loginController')
const logoutController = require('./controllers/logoutController')
const { authenticateWithJwt } = require('./helpers/authJWT')
const { uploadImage, uploadImageHandler } = require('./helpers/fileUpload')

router.get('/', (req, res) => {
  res.redirect(process.env.UI_WEBSITE)
})

router.post('/login', login, createJwtForUser)
router.post('/register', registerController)
router.post('/logout', logoutController)

// Protected Apis
router.post('/gallery/add', authenticateWithJwt, uploadImageHandler, galleryController.add)
router.post('/gallery/remove', authenticateWithJwt, galleryController.remove)
router.post('/gallery', authenticateWithJwt, galleryController)

module.exports = router
