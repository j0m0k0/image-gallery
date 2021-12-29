const UserModel = require('../models/User')

const registerController = async (req, res) => {
  try {
    await UserModel.create({ email: req.body.email, password: req.body.password })
  } catch (e) {
    res.status(422).json({ message: 'This user already exists!' })
    return
  }

  res.json({ message: 'User Created Successfully' })
}

module.exports = registerController
