/*

SatTrack-Arcturus
A RESTful API built with Node.js and Express that lets you track and predict the orbit of artificial satellites through the use of the Simplified General Perturbations-4 (SGP4) model.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/sattrack-arcturus/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

const express = require('express')

const router = express.Router({ mergeParams: true })

const { verifyAuthentication, verifyAuthorization, verifyKey } = require('../../../middlewares/auth')
const { getSatellite, getTLE } = require('../../../middlewares/satellites')

/**
 * @openapi
 * /satellites/{norad}/tle:
 *   get:
 *     summary: Retrieve TLE for a satellite
 *     description: Returns the Two-Line Element (TLE) data for the satellite specified by the NORAD ID.
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
 *         description: Successful response with TLE data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *               example: [1 25544U 98067A   24188.50795102  .00013368  00000+0  24465-3 0  9996, 2 25544  51.6394 219.6033 0010258  37.0957 113.5575 15.49623297461546]
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.get('/', verifyKey({ transact: true, cost: 1 }), getSatellite, getTLE, async (req, res) => {
  return res.status(200).json(res.tle)
})

router.post('/', verifyAuthentication(), verifyAuthorization({ allowed: ['admin'] }), getSatellite, async (req, res) => {
  const { tle } = req.body

  try {
    await res.satellite.updateOne({ tle })
    return res.status(200).json({ message: 'Two-Line Element Set Created' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.delete('/', verifyAuthentication(), verifyAuthorization({ allowed: ['admin'] }), getSatellite, getTLE, async (req, res) => {
  try {
    await res.satellite.updateOne({ $unset: { tle: 1 } })
    return res.status(200).json({ message: 'Two-Line Element Set Deleted' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

module.exports = router
