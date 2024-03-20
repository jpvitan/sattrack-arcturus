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

const router = express.Router({ mergeParams: true })

const { verifyAuthentication, verifyAuthorization } = require('../../../middlewares/auth')
const { getAccount, getKey } = require('../../../middlewares/accounts')

router.get('/', verifyAuthentication(), verifyAuthorization({ allowed: ['admin', 'user'] }), getAccount, async (req, res) => {
  return res.status(200).json(res.account.keys)
})

router.post('/', verifyAuthentication(), verifyAuthorization({ allowed: ['admin', 'user'] }), getAccount, async (req, res) => {
  const { name } = req.body

  try {
    if (res.account.keys.length + 1 > res.account.capacity) return res.status(403).json({ message: 'Key Capacity Full' })

    const key = crypto.randomUUID()
    const hashedKey = await bcrypt.hash(key, 10)

    res.account.keys.push({ name, key: hashedKey })
    res.account.save()

    return res.status(201).json({ message: 'Key Created', key: res.account._id + '-' + key })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.get('/:id', verifyAuthentication(), verifyAuthorization({ allowed: ['admin', 'user'] }), getAccount, getKey, async (req, res) => {
  return res.status(200).json(res.key)
})

router.patch('/:id', verifyAuthentication(), verifyAuthorization({ allowed: ['admin', 'user'] }), getAccount, getKey, async (req, res) => {

})

router.delete('/:id', verifyAuthentication(), verifyAuthorization({ allowed: ['admin', 'user'] }), getAccount, getKey, async (req, res) => {
  try {
    res.account.keys.pull(res.key._id)
    res.account.save()

    return res.status(200).json({ message: 'Key Deleted' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

module.exports = router
