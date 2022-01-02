const logoutController = (req, res) => {
  if (req.cookies.jwt) {
    res
      .clearCookie('jwt')
      .status(200)
      .json({
        message: 'خارج شدید'
      })
  } else {
    res.status(401).json({
      error: 'امکان اجرای این دستور را ندارید'
    })
  }
}

module.exports = logoutController
