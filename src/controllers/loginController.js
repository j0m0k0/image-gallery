const UserModel = require('../models/User')

const loginController = async (req, res) => {
  // TODO: compare password with hashed version
  const isUser = await UserModel.findOne({
    where: {
      email: req.body.email,
      password: req.body.password
    }
  })

  if (isUser) {
    res.json({ message: 'Welcome!' })
  } else {
    res.status(401).json({ message: 'Email / Password is wrong' })
  }
}

module.exports = loginController
