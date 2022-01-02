const express = require('express')
const router = express.Router()
const registerController = require('./controllers/registerController')
const galleryController = require('./controllers/galleryController')
const { login, createJwtForUser } = require('./controllers/loginController')
const logoutController = require('./controllers/logoutController')
const { authenticateWithJwt } = require('./helpers/authJWT')
const { uploadImageHandler } = require('./helpers/fileUpload')
const getImageController = require('./controllers/getImageController')
const checkController = require('./controllers/checkController')

router.get('/', (req, res) => {
  res.redirect(process.env.UI_WEBSITE)
})

router.post('/login', login, createJwtForUser)
router.post('/register', registerController)
router.post('/logout', logoutController)
router.post('/check', authenticateWithJwt, checkController)

// Protected Apis
router.post('/gallery/add', authenticateWithJwt, uploadImageHandler, galleryController.add)
router.post('/gallery/remove', authenticateWithJwt, galleryController.remove)
router.post('/gallery', authenticateWithJwt, galleryController)
router.get('/public/uploads/:name', authenticateWithJwt, getImageController)

module.exports = router
