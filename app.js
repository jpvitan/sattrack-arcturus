/*

sattrack-node
RESTful API for retrieving useful satellite information.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const accountsRouter = require('./routes/accounts')
const satellitesRouter = require('./routes/satellites')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })

const app = express()

app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/accounts', accountsRouter)
app.use('/satellites', satellitesRouter)

app.listen(3000)
