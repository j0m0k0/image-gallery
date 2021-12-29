const express = require('express')
const { PORT } = require('./src/constants/globals')
const router = require('./src/router')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const app = express()

app.use(passport.initialize())
app.use(express.json())
app.use('/', router)

passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' },
  (email, password, done) => {
    return done(null, { email, password })
  }
))

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})

app.listen(PORT, () => {
  console.log('Server Running at port', PORT)
})
