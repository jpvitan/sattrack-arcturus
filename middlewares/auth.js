/*

SatTrack-Arcturus
A RESTful API built with Node.js and Express that lets you track and predict the orbit of artificial satellites through the use of the Simplified General Perturbations-4 (SGP4) model.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/sattrack-arcturus/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

const bcrypt = require('bcrypt')
const Account = require('../models/account')

module.exports.verifyAuthentication = (options) => {
  const defaults = {
    type: 'json',
    message: 'Not Authenticated',
    path: '/'
  }

  options = { ...defaults, ...options }

  return async (req, res, next) => {
    if (req.isAuthenticated()) return next()
    if (options.type === 'redirect') return res.redirect(options.path)
    return res.status(401).json({ message: options.message })
  }
}

module.exports.verifyAuthorization = (options) => {
  const defaults = {
    type: 'json',
    message: 'Authorization Error',
    path: '/',
    allowed: []
  }

  options = { ...defaults, ...options }

  const functions = {
    admin: (req) => {
      return req.user.type === 'admin'
    },
    user: (req) => {
      return req.user.username === req.params.username
    }
  }

  return async (req, res, next) => {
    let success = false

    options.allowed.forEach(allowed => { success = functions[allowed](req) ? true : success })

    if (success) return next()
    if (options.type === 'redirect') return res.redirect(options.path)
    return res.status(403).json({ message: options.message })
  }
}

module.exports.verifyPassword = (options) => {
  const defaults = {
    message: 'Invalid Password',
    exception: []
  }

  options = { ...defaults, ...options }

  const functions = {
    admin: (req) => {
      return req.user.type === 'admin'
    },
    noPassword: (req) => {
      return !('password' in req.body)
    }
  }

  return async (req, res, next) => {
    let success = false

    options.exception.forEach(exception => { success = functions[exception](req) ? true : success })

    if (!success) {
      success = await bcrypt.compare(req.body.password, req.user.password)
    }

    if (success) return next()
    return res.status(403).json({ message: options.message })
  }
}

module.exports.verifyKey = (options) => {
  const defaults = {
    type: 'json',
    message: 'Invalid Key',
    path: '/',
    transact: false,
    cost: 0
  }

  options = { ...defaults, ...options }

  return async (req, res, next) => {
    let success = false
    let key = req.headers['x-key']

    if (!success) {
      try {
        const id = key.substring(0, 24)
        key = key.substring(25)

        const account = await Account.findById(id)

        for (let i = 0; i < account.keys.length; i++) {
          if (await bcrypt.compare(key, account.keys[i].key)) {
            if (options.transact && account.credits < options.cost) {
              options.message = 'Insufficient Credits'
            } else {
              success = true

              if (options.transact) {
                const date = new Date()
                const year = date.getUTCFullYear()
                const month = date.getUTCMonth() + 1
                const index = account.usage.findIndex((usage) => usage.year === year && usage.month === month)

                if (index === -1) {
                  for (let i = 1; i <= 12; i++) {
                    const usage = { year, month: i, hits: 0 }
                    if (i === month) usage.hits += options.cost
                    account.usage.push(usage)
                  }
                } else {
                  account.usage[index].hits += options.cost
                }

                account.credits -= options.cost
                account.keys[i].hits += options.cost

                await account.save()
              }
            }
            break
          }
        }
      } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' })
      }
    }

    if (success) return next()
    if (options.type === 'redirect') return res.redirect(options.path)
    return res.status(403).json({ message: options.message })
  }
}

module.exports.verifyToken = (options) => {
  const defaults = {
    type: 'json',
    message: 'Invalid Token',
    path: '/'
  }

  options = { ...defaults, ...options }

  return async (req, res, next) => {
    const { token } = req.body

    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET,
          response: token
        })
      }
    )

    const { success } = await response.json()

    if (success) return next()
    return res.status(403).json({ message: options.message })
  }
}
