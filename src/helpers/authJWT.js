const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy

const secret = process.env.JWT_SECRET

const cookieExtractor = req => {
  let jwt = null

  if (req && req.cookies) {
    jwt = req.cookies.jwt
  }

  return jwt
}

passport.use('jwt', new JwtStrategy({
  jwtFromRequest: cookieExtractor,
  secretOrKey: secret
}, (jwtPayload, done) => {
  const { expiration } = jwtPayload

  const now = new Date()
  if (now.getTime() > new Date(expiration).getTime()) {
    done('Unauthorized', false)
  }

  done(null, jwtPayload)
}))

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})

const authenticateWithJwt = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) { return next(err) }
    if (!user) { return res.status(401).json({ message: 'Unauthenticated' }) }
    const now = new Date()
    console.log(user)
    if (now.getTime() > new Date(user.expiration).getTime()) {
      return res.status(401).json({ message: 'Unauthenticated' })
    } else {
      return res.json({ message: 'Authenticated' })
    }
  })(req, res, next)
}

module.exports.authenticateWithJwt = authenticateWithJwt
