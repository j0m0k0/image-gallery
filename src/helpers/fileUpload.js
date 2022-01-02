const multer = require('multer')
const mime = require('mime-types')
const path = require('path')

const storage = multer.diskStorage({
  destination: 'public/uploads',
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const fileExtension = mime.extension(file.mimetype)
    cb(null, uniqueSuffix + '.' + fileExtension)
  }
})
const uploadImage = multer({
  storage,
  fileFilter: function (req, file, callback) {
    const ext = path.extname(file.originalname)
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.svg') {
      req.fileValidationError = 'فایل ارسال شده عکس نبود'
      return callback(null, true)
    }
    callback(null, true)
  }
}).single('image')

const uploadImageHandler = (req, res, next) => {
  uploadImage(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      res.status(403).json({ message: 'با هر درخواست تنها می توانید یک عکس ارسال کنید' })
      return
    }
    next()
  })
}

module.exports.uploadImageHandler = uploadImageHandler
