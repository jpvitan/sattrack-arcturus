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
