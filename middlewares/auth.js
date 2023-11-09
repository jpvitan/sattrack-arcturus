/*

SatTrack-Arcturus
A RESTful API built with Node.js and Express that lets you retrieve useful satellite information by providing identifiers assigned by the North American Aerospace Defense Command.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/sattrack-arcturus/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

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

module.exports.verifyAdministrator = (options) => {
  const defaults = {
    type: 'json',
    message: 'Authorization Error',
    path: '/'
  }

  options = { ...defaults, ...options }

  return async (req, res, next) => {
    if (req.user.type === 'admin') return next()
    if (options.type === 'redirect') return res.redirect(options.path)
    return res.status(403).json({ message: options.message })
  }
}

module.exports.verifyPermissions = (options) => {
  const defaults = {
    type: 'json',
    message: 'Authorization Error',
    path: '/',
    allowed: ['admin']
  }

  options = { ...defaults, ...options }

  const functions = {
    admin: (req) => {
      return req.user.type === 'admin'
    }
  }

  return async (req, res, next) => {
    const success = false

    allowed.forEach(allowed => { success = functions[allowed](req) ? true : success })

    if (success) return next()
    if (options.type === 'redirect') return res.redirect(options.path)
    return res.status(403).json({ message: options.message })
  }
}
