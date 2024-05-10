/*

SatTrack-Arcturus
A RESTful API built with Node.js and Express that lets you track and predict the orbit of artificial satellites through the use of the Simplified General Perturbations-4 (SGP4) model.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/sattrack-arcturus/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    default: 'user'
  },
  credits: {
    type: Number,
    required: true,
    default: 1000
  },
  capacity: {
    type: Number,
    required: true,
    default: 5
  },
  usage: [{
    year: {
      type: Number,
      required: true
    },
    month: {
      type: Number,
      required: true
    },
    hits: {
      type: Number,
      required: true,
      default: 0
    }
  }],
  keys: [{
    key: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true,
      default: 'Active'
    },
    hits: {
      type: Number,
      required: true,
      default: 0
    }
  }]
})

module.exports = mongoose.model('Account', accountSchema)
