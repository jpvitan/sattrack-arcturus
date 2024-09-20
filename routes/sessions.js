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
const passport = require('passport')

const router = express.Router()

const { verifyToken } = require('../middlewares/auth')

router.post('', verifyToken(), passport.authenticate('local'), async (req, res) => {
  return res.status(200).json({ message: 'Account Verified', type: req.user.type })
})

router.delete('', async (req, res) => {
  req.logout((error) => {
    if (error) return res.status(500).json({ message: 'Internal Server Error' })
    return res.status(200).json({ message: 'Account Signed Out' })
  })
})

module.exports = router
