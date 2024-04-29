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
const Satellite = require('../../../models/satellite')

const orbitRouter = require('./orbit')

const router = express.Router()

const { verifyAuthentication, verifyAuthorization, verifyKey } = require('../../../middlewares/auth')
const { getSatellite } = require('../../../middlewares/satellites')

router.get('/', verifyKey({ transact: true, cost: 1 }), async (req, res) => {
  let { name, country, purpose, limit, skip } = req.query

  const filter = {}
  if (name) filter.name = name
  if (country) filter.country = country
  if (purpose) filter.purpose = purpose

  const projection = {}

  const options = {}
  if (limit) {
    limit = parseInt(limit)
    if (isNaN(limit) || !Number.isInteger(limit)) return res.status(400).json({ message: 'Invalid Value: [limit]' })
  } else {
    limit = 100
  }
  options.limit = limit

  if (skip) {
    skip = parseInt(skip)
    if (isNaN(skip) || !Number.isInteger(skip)) return res.status(400).json({ message: 'Invalid Value: [skip]' })
    options.skip = skip
  }

  try {
    const satellites = await Satellite.find(filter, projection, options)
    return res.status(200).json(satellites)
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.post('/', verifyAuthentication(), verifyAuthorization({ allowed: ['admin'] }), async (req, res) => {
  const { name, norad, country, purpose } = req.body

  try {
    const entry = await Satellite.findOne({ norad })
    if (entry) return res.status(409).json({ message: 'Satellite Exists' })

    const satellite = new Satellite({ name, norad, country, purpose })
    await satellite.save()
    return res.status(201).json({ message: 'Satellite Created' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.get('/:norad', verifyKey({ transact: true, cost: 1 }), getSatellite, async (req, res) => {
  return res.status(200).json(res.satellite)
})

router.patch('/:norad', verifyAuthentication(), verifyAuthorization({ allowed: ['admin'] }), getSatellite, async (req, res) => {
  const { ...update } = req.body

  try {
    await res.satellite.updateOne(update)
    return res.status(200).json({ message: 'Satellite Updated' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.delete('/:norad', verifyAuthentication(), verifyAuthorization({ allowed: ['admin'] }), async (req, res) => {
  const { norad } = req.params

  const filter = {
    norad
  }

  try {
    await Satellite.findOneAndDelete(filter)
    return res.status(200).json({ message: 'Satellite Deleted' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.use('/:norad/orbit', orbitRouter)

module.exports = router
