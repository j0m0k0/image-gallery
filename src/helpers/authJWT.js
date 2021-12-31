const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const UserModel = require('../models/User')
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
}, async (jwtPayload, done) => {
  const { expiration, id } = jwtPayload

  // after decoding the jwt with our secret key,
  // Two things will be checked
  // 1. If token expired or not
  // 2. If user with the email in the jwt token really exists or not
  const now = new Date()
  if (now.getTime() > new Date(expiration).getTime()) {
    done('Unauthorized', false)
  }

  // console.log('user id is', id)
  const isUser = await UserModel.findOne({
    where: {
      id
    }
  })

  if (isUser) {
    done(null, jwtPayload)
    return
  }

  done('Unauthorized', false)
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
    if (now.getTime() > new Date(user.expiration).getTime()) {
      return res.status(401).json({ message: 'Unauthenticated' })
    } else {
      req.user = user
      next()
    }
  })(req, res, next)
}

module.exports.authenticateWithJwt = authenticateWithJwt
