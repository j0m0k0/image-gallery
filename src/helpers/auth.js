const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const UserModel = require('../models/User')

passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' },
  async (email, password, done) => {
    let isUser = null
    try {
      isUser = await UserModel.findOne({
        where: {
          email,
          password
        }
      })
      if (isUser) {
        return done(null, { email })
      }
    } catch (e) {
      return done(e)
    }

    return done(null, false, { message: 'Wrong username / password' })
  }
))

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})
