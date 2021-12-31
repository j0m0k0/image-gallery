const bcrypt = require('bcrypt')
const UserModel = require('../models/User')

const registerController = async (req, res) => {
  try {
    // TODO: save password as hash
    const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS))
    const hash = bcrypt.hashSync(req.body.password, salt)
    await UserModel.create({ email: req.body.email, password: hash })
  } catch (e) {
    // console.log(e)
    res.status(401).json({ message: 'This user already exists!' })
    return
  }

  res.json({ message: 'User Created Successfully' })
}

module.exports = registerController
