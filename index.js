require('dotenv').config()
const express = require('express')
const router = require('./src/router')
const passport = require('passport')
const { testDBConnection } = require('./src/utils/db')
require('./src/helpers/auth')

const app = express()

app.use(passport.initialize())
app.use(express.json())
app.use('/', router)

app.listen(process.env.APP_PORT, async () => {
  await testDBConnection()
  console.log('Server Running at port', process.env.APP_PORT)
})
