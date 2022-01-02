const checkController = (req, res) => {
  if (req.user) {
    res.json({ message: 'مجاز' })
  } else {
    res.json({ message: 'غیرمجاز' })
  }
}

module.exports = checkController
