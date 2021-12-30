require('dotenv').config()
const express = require('express')
const routes = require('./src/routes')
const passport = require('passport')
const cookieParser = require('cookie-parser')
require('./src/helpers/authJWT')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true })) // idk what is this
app.use(passport.initialize())
app.use('/', routes)

app.listen(process.env.APP_PORT, async () => {
  console.log('Server Running at port', process.env.APP_PORT)
})
