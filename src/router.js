const express = require('express')
const loginController = require('./controllers/loginController')
const registerController = require('./controllers/registerController')
const router = express.Router()
const passport = require('passport')

router.get('/', (req, res) => {
  res.send('Index Router')
})

// gets username,password and validates it with DB
router.post('/login', passport.authenticate('local'), loginController)
router.post('/register', passport.authenticate('local'), registerController)

module.exports = router
