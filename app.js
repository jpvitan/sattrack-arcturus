/*

SatTrack-Arcturus
A RESTful API built with Node.js and Express that lets you retrieve useful satellite information by providing identifiers assigned by the North American Aerospace Defense Command.

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

const apiRouter = require('./routes/api')
const sessionRouter = require('./routes/sessions')

const { verifyAuthentication } = require('./middlewares/auth')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST'],
  credentials: true
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', async (req, res) => {
  return res.render('pages/index', {
    title: 'SatTrack-Arcturus',
    description: 'A RESTful API built with Node.js and Express that lets you retrieve useful satellite information by providing identifiers assigned by the North American Aerospace Defense Command.'
  })
})
app.get('/dashboard', verifyAuthentication({ type: 'redirect' }), async (req, res) => {
  return res.render('pages/dashboard', {
    title: 'Dashboard | SatTrack-Arcturus',
    description: 'A RESTful API built with Node.js and Express that lets you retrieve useful satellite information by providing identifiers assigned by the North American Aerospace Defense Command.'
  })
})

app.use('/api', apiRouter)
app.use('/sessions', sessionRouter)

const PORT = process.env.PORT || 8080
app.listen(PORT)
