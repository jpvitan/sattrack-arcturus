/*

SatTrack-Arcturus
A RESTful API built with Node.js and Express that lets you retrieve useful satellite information by providing identifiers assigned by the North American Aerospace Defense Command.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/sattrack-arcturus/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

const express = require('express')
const passport = require('passport')
const bcrypt = require('bcrypt')
const auth = require('../middlewares/auth')
const Account = require('../models/account')

const router = express.Router()

router.get('/', auth.checkAuthentication, async (req, res) => {
  const { type } = req.query

  const filter = {}
  const projection = { username: 1 }
  const options = {}

  if (req.user.type === 'admin') {
    if (type) filter.type = type
    projection.email = 1
    projection.name = 1
    projection.type = 1
  }

  const accounts = await Account.find(filter, projection, options)
  return res.status(200).json(accounts)
})

router.post('/', async (req, res) => {
  try {
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password
    const name = req.body.name

    const user = await Account.findOne({ email })
    if (user) return res.status(409).json({ message: 'Account Exists' })

    const hashedPassword = await bcrypt.hash(password, 10)

    const account = new Account({ email, username, password: hashedPassword, name })
    account.save((error, result) => {
      if (error) return res.status(500).json({ message: 'Internal Server Error' })
      else return res.status(201).json({ message: 'Account Created' })
    })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

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
