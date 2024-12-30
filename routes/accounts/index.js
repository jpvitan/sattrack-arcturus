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

const router = express.Router()

const { verifyAuthentication, verifyAuthorization } = require('../../middlewares/auth')
const { getPage } = require('../../middlewares/pages')

router.get('/console', verifyAuthentication({ type: 'redirect' }), verifyAuthorization({ type: 'redirect', allowed: ['admin'] }), getPage(async (req, res, next, locals) => { locals.user = req.user }))

router.get('/dashboard', verifyAuthentication({ type: 'redirect' }), verifyAuthorization({ type: 'redirect', allowed: ['user'] }), getPage(async (req, res, next, locals) => { locals.user = req.user }))

module.exports = router
