const express = require('express')
const { PORT } = require('./src/globals')
const router = require('./src/router')
const passport = require('passport')
const { testDBConnection } = require('./src/utils/db')
require('./src/helpers/auth')

const app = express()

app.use(passport.initialize())
app.use(express.json())
app.use('/', router)

app.listen(PORT, async () => {
  await testDBConnection()
  console.log('Server Running at port', PORT)
})
