const UserModel = require('../models/User')

const loginController = async (req, res) => {
  const isUser = await UserModel.findOne({
    where: {
      email: req.body.email,
      password: req.body.password
    }
  })

  if (isUser) {
    res.json({ message: 'Welcome!' })
  } else {
    res.status(422).json({ message: 'Email / Password is wrong' })
  }
}

module.exports = loginController
