const loginController = (req, res) => {
  res.json(req.user)
}

module.exports = loginController
