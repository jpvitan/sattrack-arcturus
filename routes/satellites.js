/*

sattrack-node
RESTful API for retrieving useful satellite information.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

const express = require('express')
const Satellite = require('../models/satellite')

const router = express.Router()

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

router.get('/', async (req, res) => {
  let { name, country, purpose, limit, skip } = req.query

  const filter = {}
  if (name) filter.name = name
  if (country) filter.country = country
  if (purpose) filter.purpose = purpose

  const projection = {}

  const options = {}
  if (limit) {
    limit = parseInt(limit)
    if (isNaN(limit) || !Number.isInteger(limit)) return res.status(400).json({ message: 'Invalid Value: [skip]' })
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

router.get('/:norad', getSatellite, async (req, res) => {
  return res.status(200).json(res.satellite)
})

module.exports = router
