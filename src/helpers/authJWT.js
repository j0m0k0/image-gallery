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

  if (Date.now() > expiration) {
    done('Unauthorized', false)
  }

  done(null, jwtPayload)
}))
