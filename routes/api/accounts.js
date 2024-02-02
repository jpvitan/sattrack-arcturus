/*

SatTrack-Arcturus
A RESTful API built with Node.js and Express that lets you retrieve useful satellite information by providing identifiers assigned by the North American Aerospace Defense Command.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/sattrack-arcturus/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

const crypto = require('crypto')
const express = require('express')
const bcrypt = require('bcrypt')
const Account = require('../../models/account')

const router = express.Router()

const { verifyAuthentication, verifyAuthorization, verifyPassword } = require('../../middlewares/auth')

const getAccount = async (req, res, next) => {
  const { username } = req.params
  let account
  try {
    account = await Account.findOne({ username })
    if (!account) return res.status(404).json({ message: 'Not Found' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
  res.account = account
  next()
}

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

router.patch('/:username', verifyAuthentication(), verifyAuthorization({ allowed: ['admin', 'user'] }), verifyPassword({ exception: ['admin', 'noPassword'] }), async (req, res) => {
  const { username } = req.params

  const filter = {
    username
  }

  const { password, raw, ...update } = req.body

  try {
    if (password && raw) update.password = await bcrypt.hash(raw, 10)
    await Account.findOneAndUpdate(filter, update)
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

router.get('/:username/keys', verifyAuthentication(), verifyAuthorization({ allowed: ['admin', 'user'] }), getAccount, async (req, res) => {
  return res.status(200).json(res.account.keys)
})

router.post('/:username/keys', verifyAuthentication(), verifyAuthorization({ allowed: ['admin', 'user'] }), getAccount, async (req, res) => {
  const { name } = req.body

  const key = crypto.randomUUID()

  try {
    const hashedKey = await bcrypt.hash(key, 10)

    res.account.keys.push({ name, key: hashedKey })
    res.account.save()

    return res.status(201).json({ message: 'Key Created', key })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

module.exports = router
