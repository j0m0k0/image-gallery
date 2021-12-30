const express = require('express')
const router = express.Router()
const passport = require('passport')
const registerController = require('./controllers/registerController')
const galleryController = require('./controllers/galleryController')
const { login, createJwtForUser } = require('./controllers/loginController')
const logoutController = require('./controllers/logoutController')

// gets username,password and validates it with DB
router.post('/login', login, createJwtForUser)
router.post('/register', registerController)
router.post('/logout', logoutController)

// Protected Apis
router.post('/gallery/add', passport.authenticate('jwt', { session: false }), galleryController.add)
router.post('/gallery/remove', passport.authenticate('jwt', { session: false }), galleryController.remove)
router.post('/gallery', passport.authenticate('jwt', { session: false }), galleryController)

module.exports = router
