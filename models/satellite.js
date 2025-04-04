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
  },
  modified: {
    type: Date
  },
  tle: [String]
})

module.exports = mongoose.model('Satellite', satelliteSchema)
