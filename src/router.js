const express = require('express')
const router = express.Router()
const passport = require('passport')
const loginController = require('./controllers/loginController')
const registerController = require('./controllers/registerController')
const galleryController = require('./controllers/galleryController')

router.get('/', (req, res) => {
  res.send('Index Router')
})

// gets username,password and validates it with DB
router.post('/login', loginController)
router.post('/register', registerController)
router.post('/gallery/add', galleryController.add)
router.post('/gallery/remove', galleryController.remove)
router.post('/gallery', galleryController)

module.exports = router
