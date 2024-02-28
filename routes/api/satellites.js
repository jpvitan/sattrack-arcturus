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
const Satellite = require('../../models/satellite')

const router = express.Router()

const { verifyKey } = require('../../middlewares/auth')

const getSatellite = async (req, res, next) => {
  const { norad } = req.params
  let satellite
  try {
    satellite = await Satellite.findOne({ norad })
    if (!satellite) return res.status(404).json({ message: 'Not Found' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
  res.satellite = satellite
  next()
}

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

router.post('/', async (req, res) => {
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

router.get('/:norad', verifyKey(), getSatellite, async (req, res) => {
  return res.status(200).json(res.satellite)
})

module.exports = router
