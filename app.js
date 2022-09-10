/*

sattrack-node
RESTful API for retrieving useful satellite information

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const satellitesRouter = require('./routes/satellites')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })

const app = express()

app.use(express.json())
app.use('/satellites', satellitesRouter)

app.listen(3000)
