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

const accountsRouter = require('./accounts')
const satellitesRouter = require('./satellites')

const router = express.Router()

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     Key:
 *       type: apiKey
 *       in: header
 *       name: x-key
 *   schemas:
 *     Satellite:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: International Space Station
 *         norad:
 *           type: integer
 *           example: 25544
 *         country:
 *           type: string
 *           example: Multinational
 *         purpose:
 *           type: string
 *           example: Space Science
 *         tle:
 *           type: array
 *           items:
 *             type: string
 *           example: [1 25544U 98067A   24188.50795102  .00013368  00000+0  24465-3 0  9996, 2 25544  51.6394 219.6033 0010258  37.0957 113.5575 15.49623297461546]
 *       required:
 *         - name
 *         - norad
 *         - country
 *         - purpose
 */

router.use('/accounts', accountsRouter)
router.use('/satellites', satellitesRouter)

module.exports = router
