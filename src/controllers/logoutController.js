const logoutController = (req, res) => {
  if (req.cookies.jwt) {
    res
      .clearCookie('jwt')
      .status(200)
      .json({
        message: 'You have logged out'
      })
  } else {
    res.status(401).json({
      error: 'Unauthorized'
    })
  }
}

module.exports = logoutController
