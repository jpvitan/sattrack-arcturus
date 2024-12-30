/*

SatTrack-Arcturus
A RESTful API built with Node.js and Express that lets you track and predict the orbit of artificial satellites through the use of the Simplified General Perturbations-4 (SGP4) model.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/sattrack-arcturus/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

require('dotenv').config()

const express = require('express')
const session = require('express-session')
const cors = require('cors')
const mongoose = require('./config/mongoose')
const passport = require('./config/passport')

const accountsRouter = require('./routes/accounts')
const apiRouter = require('./routes/api')
const helpRouter = require('./routes/help')
const legalRouter = require('./routes/legal')
const sessionRouter = require('./routes/sessions')

const { getPage } = require('./middlewares/pages')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('./public'))
app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({
  limit: '5mb',
  extended: true
}))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', getPage())

app.use('/accounts', accountsRouter)
app.use('/api', apiRouter)
app.use('/help', helpRouter)
app.use('/legal', legalRouter)
app.use('/sessions', sessionRouter)

const PORT = process.env.PORT || 8080
app.listen(PORT)
