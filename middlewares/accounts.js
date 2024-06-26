/*

SatTrack-Arcturus
A RESTful API built with Node.js and Express that lets you track and predict the orbit of artificial satellites through the use of the Simplified General Perturbations-4 (SGP4) model.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/sattrack-arcturus/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

const mongoose = require('mongoose')
const Account = require('../models/account')

module.exports.getAccount = async (req, res, next) => {
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

module.exports.getKey = async (req, res, next) => {
  const { id } = req.params
  let index
  try {
    index = res.account.keys.findIndex(key => key._id.equals(new mongoose.Types.ObjectId(id)))
    if (index === -1) return res.status(404).json({ message: 'Not Found' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
  res.key = res.account.keys[index].toObject()
  res.key.index = index
  next()
}
