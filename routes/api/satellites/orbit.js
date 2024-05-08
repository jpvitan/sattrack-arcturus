/*

SatTrack-Arcturus
A RESTful API built with Node.js and Express that lets you retrieve useful satellite information by providing identifiers assigned by the North American Aerospace Defense Command.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/sattrack-arcturus/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

const satellite = require('satellite.js')
const express = require('express')

const router = express.Router({ mergeParams: true })

const { verifyKey } = require('../../../middlewares/auth')
const { getSatellite, getTLE } = require('../../../middlewares/satellites')

router.get('/', verifyKey({ transact: true, cost: 1 }), getSatellite, getTLE, async (req, res) => {
  const defaults = {
    observerLatitude: 0,
    observerLongitude: 0,
    observerAltitude: 0,
    seconds: 10
  }
  const options = { ...defaults, ...req.query }
  const { seconds } = options

  const [line1, line2] = res.tle
  const record = satellite.twoline2satrec(line1, line2)
  const date = new Date()

  const orbit = []

  for (let i = 0; i < seconds; i++) {
    const gmst = satellite.gstime(date)
    const { position: eci, velocity } = satellite.propagate(record, date)
    const geodetic = satellite.eciToGeodetic(eci, gmst)

    const { latitude, longitude, height: altitude } = geodetic
    orbit.push({ latitude, longitude, altitude })

    date.setSeconds(date.getSeconds() + 1)
  }

  return res.status(200).json(orbit)
})

module.exports = router
