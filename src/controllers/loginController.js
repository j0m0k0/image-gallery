const bcrypt = require('bcrypt')
const UserModel = require('../models/User')

const loginController = async (req, res) => {
  // TODO: compare password with hashed version
  let isUser = false

  try {
    isUser = await UserModel.findOne({
      where: {
        email: req.body.email
      }
    })
    if (isUser && bcrypt.compareSync(req.body.password, isUser.password)) {
      res.json({ message: 'Welcome!' })
    } else {
      res.status(401).json({ message: 'Unauthorized' })
    }
  } catch (e) {
    res.status(500).json({ message: 'System Fault' })
  }
}

module.exports = loginController
