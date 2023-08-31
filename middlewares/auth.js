/*

SatTrack-Arcturus
A RESTful API built with Node.js and Express that lets you retrieve useful satellite information by providing identifiers assigned by the North American Aerospace Defense Command.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/sattrack-arcturus/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

module.exports.verifyAuthentication = async (req, res, next) => {
  if (req.isAuthenticated()) return next()
  return res.status(401).json({ message: 'Not Authenticated' })
}

module.exports.verifyAdministrator = async (req, res, next) => {
  if (req.user.type === 'admin') return next()
  return res.status(403).json({ message: 'Authorization Error' })
}
