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
const bcrypt = require('bcrypt')
const Account = require('../../../models/account')

const keysRouter = require('./keys')

const router = express.Router()

const { verifyAuthentication, verifyAuthorization, verifyPassword } = require('../../../middlewares/auth')
const { getAccount } = require('../../../middlewares/accounts')

router.get('/', verifyAuthentication(), verifyAuthorization({ allowed: ['admin'] }), async (req, res) => {
  const { type } = req.query

  const filter = {}
  if (type) filter.type = type

  const projection = {
    username: 1,
    email: 1,
    name: 1,
    type: 1
  }

  const options = {}

  try {
    const accounts = await Account.find(filter, projection, options)
    return res.status(200).json(accounts)
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.post('/', async (req, res) => {
  const { email, username, password, name } = req.body

  try {
    const entry = await Account.findOne({ username })
    if (entry) return res.status(409).json({ message: 'Account Exists' })

    const hashedPassword = await bcrypt.hash(password, 10)

    const account = new Account({ email, username, password: hashedPassword, name })
    await account.save()
    return res.status(201).json({ message: 'Account Created' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.get('/:username', verifyAuthentication(), verifyAuthorization({ allowed: ['admin', 'user'] }), getAccount, async (req, res) => {
  return res.status(200).json(res.account)
})

router.patch('/:username', verifyAuthentication(), verifyAuthorization({ allowed: ['admin', 'user'] }), verifyPassword({ exception: ['admin', 'noPassword'] }), getAccount, async (req, res) => {
  const { password, raw, ...update } = req.body

  try {
    if (password && raw) update.password = await bcrypt.hash(raw, 10)
    await res.account.updateOne(update)
    return res.status(200).json({ message: 'Account Updated' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.delete('/:username', verifyAuthentication(), verifyAuthorization({ allowed: ['admin', 'user'] }), verifyPassword({ exception: ['admin'] }), async (req, res) => {
  const { username } = req.params

  const filter = {
    username
  }

  try {
    await Account.findOneAndDelete(filter)
    return res.status(200).json({ message: 'Account Deleted' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.use('/:username/keys', keysRouter)

module.exports = router
