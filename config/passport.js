/*

SatTrack-Arcturus
A RESTful API built with Node.js and Express that lets you retrieve useful satellite information by providing identifiers assigned by the North American Aerospace Defense Command.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/sattrack-arcturus/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const Account = require('../models/account')

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await Account.findOne({ username })
    if (user == null || !(await bcrypt.compare(password, user.password))) return done(null, false)
    return done(null, user)
  } catch (error) {
    return done(error)
  }
}))
passport.serializeUser(async (user, done) => {
  done(null, user.username)
})
passport.deserializeUser(async (username, done) => {
  const user = await Account.findOne({ username })
  done(null, user)
})

module.exports = passport
