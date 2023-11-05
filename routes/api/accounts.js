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
const bcrypt = require('bcrypt')
const Account = require('../../models/account')

const router = express.Router()

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

router.get('/', async (req, res) => {
  const { type } = req.query

  const filter = {}
  const projection = { username: 1 }
  const options = {}

  // if (req.user.type === 'admin') {
  //   if (type) filter.type = type
  //   projection.email = 1
  //   projection.name = 1
  //   projection.type = 1
  // }

  const accounts = await Account.find(filter, projection, options)
  return res.status(200).json(accounts)
})

router.post('/', async (req, res) => {
  try {
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password
    const name = req.body.name

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

router.get('/:username', getAccount, async (req, res) => {
  return res.status(200).json(res.account)
})

router.patch('/:username', async (req, res) => {
  try {
    const { username } = req.params
    const filter = { username }
    const update = req.body
    await Account.findOneAndUpdate(filter, update)
    return res.status(200).json({ message: 'Account Updated' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

module.exports = router
