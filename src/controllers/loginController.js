const jwt = require('jsonwebtoken')
const UserModel = require('../models/User')
const bcrypt = require('bcrypt')

const secret = process.env.JWT_SECRET

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const isUser = await UserModel.findOne({
      where: {
        email
      }
    })

    if (isUser && bcrypt.compareSync(password, isUser.password)) {
      res.locals.user = { id: isUser.id, email }
      next()
    } else {
      res.status(401).json({
        error: 'Incorrect username or password'
      })
    }
  } catch (error) {
    // console.log(error)
    res.status(500).json({ error })
  }
}

const createJwtForUser = async (req, res) => {
  let user

  if (res.locals.user) {
    user = res.locals.user
  } else {
    res.status(401).json({
      error: 'user not found'
    })
  }

  const expirationDate = new Date()
  expirationDate.setSeconds(expirationDate.getSeconds() + Number(process.env.JWT_EXPIRATION_TIME))
  const payload = {
    email: user.email,
    id: user.id,
    expiration: expirationDate
  }

  const token = jwt.sign(JSON.stringify(payload), secret)

  res
    .cookie('jwt',
      token, {
        httpOnly: true,
        secure: false // --> SET TO TRUE ON PRODUCTION
      }
    )
    .status(200)
    .json({
      message: 'Logged In'
    })
}

module.exports.createJwtForUser = createJwtForUser
module.exports.login = login
