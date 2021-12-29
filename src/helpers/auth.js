const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

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
