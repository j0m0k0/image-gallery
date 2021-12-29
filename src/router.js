const express = require('express')
const loginController = require('./controllers/loginController')
const router = express.Router()
const passport = require('passport')

router.get('/', (req, res) => {
  res.send('Index Router')
})

// gets username,password and validates it with DB
router.post('/login', passport.authenticate('local'), loginController)

module.exports = router
