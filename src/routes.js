const express = require('express')
const router = express.Router()
const passport = require('passport')
const registerController = require('./controllers/registerController')
const galleryController = require('./controllers/galleryController')
const { login, createJwtForUser } = require('./controllers/loginController')
const logoutController = require('./controllers/logoutController')
const { authenticateWithJwt } = require('./helpers/authJWT')

// gets username,password and validates it with DB
router.post('/login', login, createJwtForUser)
router.post('/register', registerController)
router.post('/logout', logoutController)

// Protected Apis
router.post('/gallery/add', authenticateWithJwt, galleryController.add)
router.post('/gallery/remove', authenticateWithJwt, galleryController.remove)
router.post('/gallery', authenticateWithJwt, galleryController)

module.exports = router
