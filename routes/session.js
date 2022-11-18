/*

sattrack-node
RESTful API for retrieving useful satellite information.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

const express = require('express')
const passport = require('passport')
const auth = require('./auth')

const router = express.Router()

router.post('/signin', passport.authenticate('local'), async (req, res) => {
  return res.status(200).json({ message: 'Account Verified' })
})

router.post('/signout', auth.checkAuthentication, async (req, res) => {
  req.logout((error) => {
    if (error) return res.status(500).json({ message: 'Internal Server Error' })
    return res.status(200).json({ message: 'Account Signed Out' })
  })
})

module.exports = router
