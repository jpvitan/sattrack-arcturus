/*

sattrack-node
RESTful API for retrieving useful satellite information

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
    if (!satellite) {
      return res.status(404).json({ message: 'Not Found' })
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
  res.satellite = satellite
  next()
}

router.get('/', async (req, res) => {
  const { name, country, purpose } = req.query
  const query = {}
  if (name) {
    query.name = name
  }
  if (country) {
    query.country = country
  }
  if (purpose) {
    query.purpose = purpose
  }
  try {
    const satellites = await Satellite.find(query)
    return res.status(200).json(satellites)
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.get('/:norad', getSatellite, async (req, res) => {
  return res.status(200).json(res.satellite)
})

module.exports = router
