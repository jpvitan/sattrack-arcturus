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

router.get('/console', verifyAuthentication({ type: 'redirect' }), verifyAuthorization({ type: 'redirect', allowed: ['admin'] }), async (req, res) => {
  return res.render('pages/accounts/console', {
    title: 'Console | SatTrack-Arcturus',
    description: 'A RESTful API built with Node.js and Express that lets you track and predict the orbit of artificial satellites through the use of the Simplified General Perturbations-4 (SGP4) model.',
    user: req.user
  })
})

router.get('/dashboard', verifyAuthentication({ type: 'redirect' }), verifyAuthorization({ type: 'redirect', allowed: ['user'] }), async (req, res) => {
  return res.render('pages/accounts/dashboard', {
    title: 'Dashboard | SatTrack-Arcturus',
    description: 'A RESTful API built with Node.js and Express that lets you track and predict the orbit of artificial satellites through the use of the Simplified General Perturbations-4 (SGP4) model.',
    user: req.user
  })
})

module.exports = router
