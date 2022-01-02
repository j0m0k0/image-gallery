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
    res.status(401).json({ message: 'این کاربر در سیستم وجود دارد' })
    return
  }

  res.json({ message: 'حساب کاربری شما با موفقیت ایجاد شد' })
}

module.exports = registerController
