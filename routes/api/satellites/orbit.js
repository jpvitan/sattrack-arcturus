/*

SatTrack-Arcturus
A RESTful API built with Node.js and Express that lets you track and predict the orbit of artificial satellites through the use of the Simplified General Perturbations-4 (SGP4) model.

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

/**
 * @openapi
 * /satellites/{norad}/orbit:
 *   get:
 *     summary: Retrieve predicted orbit of a satellite
 *     description: Returns an array of predicted orbit data points for the satellite specified by the NORAD ID, using the SGP4 model.
 *     tags:
 *       - Satellites
 *     parameters:
 *       - name: norad
 *         in: path
 *         description: The unique identifier of the satellite.
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - Key: []
 *     responses:
 *       200:
 *         description: Successful response with predicted orbit data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   latitude:
 *                     type: number
 *                     format: float
 *                     description: The latitude of the satellite at this data point.
 *                     example: -29.83176282952035
 *                   longitude:
 *                     type: number
 *                     format: float
 *                     description: The longitude of the satellite at this data point.
 *                     example: -17.791634597028697
 *                   altitude:
 *                     type: number
 *                     format: float
 *                     description: The altitude of the satellite at this data point.
 *                     example: 425.47637939396554
 *                   timestamp:
 *                     type: integer
 *                     format: int64
 *                     description: The timestamp when the data point was recorded.
 *                     example: 1722302245049
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.get('/', verifyKey({ transact: true, cost: 10 }), getSatellite, getTLE, async (req, res) => {
  const defaults = {
    observerLatitude: 0,
    observerLongitude: 0,
    observerAltitude: 0,
    seconds: 10,
    unit: 'degree'
  }
  const options = { ...defaults, ...req.query }
  const { seconds, unit } = options

  const [line1, line2] = res.tle
  const record = satellite.twoline2satrec(line1, line2)
  const date = new Date()

  const orbit = []

  for (let i = 0; i < seconds; i++) {
    const gmst = satellite.gstime(date)
    const { position: eci, velocity } = satellite.propagate(record, date)
    const geodetic = satellite.eciToGeodetic(eci, gmst)

    let { latitude, longitude, height: altitude } = geodetic

    if (unit === 'degree') {
      latitude = satellite.degreesLat(latitude)
      longitude = satellite.degreesLong(longitude)
    }

    orbit.push({
      latitude,
      longitude,
      altitude,
      timestamp: date.getTime()
    })

    date.setSeconds(date.getSeconds() + 1)
  }

  return res.status(200).json(orbit)
})

module.exports = router
