require('dotenv').config()
const express = require('express')
const router = require('./src/router')
const passport = require('passport')
const { testDBConnection } = require('./src/utils/db')
const cookieParser = require('cookie-parser')
require('./src/helpers/authJWT')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true })) // idk what is this
app.use(passport.initialize())
app.use('/', router)

app.listen(process.env.APP_PORT, async () => {
  await testDBConnection()
  console.log('Server Running at port', process.env.APP_PORT)
})
