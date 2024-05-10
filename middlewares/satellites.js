/*

SatTrack-Arcturus
A RESTful API built with Node.js and Express that lets you track and predict the orbit of artificial satellites through the use of the Simplified General Perturbations-4 (SGP4) model.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/sattrack-arcturus/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

const Satellite = require('../models/satellite')

module.exports.getSatellite = async (req, res, next) => {
  const { norad } = req.params
  let satellite
  try {
    satellite = await Satellite.findOne({ norad })
    if (!satellite) return res.status(404).json({ message: 'Satellite Not Found' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
  res.satellite = satellite
  next()
}

module.exports.getTLE = async (req, res, next) => {
  if (!res.satellite.tle || res.satellite.tle.length === 0) return res.status(404).json({ message: 'Two-Line Element Not Found' })
  res.tle = res.satellite.tle
  next()
}
