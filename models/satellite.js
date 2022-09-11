/*

sattrack-node
RESTful API for retrieving useful satellite information.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

const mongoose = require('mongoose')

const satelliteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  norad: {
    type: Number,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  purpose: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Satellite', satelliteSchema)
