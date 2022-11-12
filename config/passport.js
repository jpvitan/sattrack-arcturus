/*

sattrack-node
RESTful API for retrieving useful satellite information.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

const bcrypt = require('bcrypt')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Account = require('../models/account')

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        const user = await Account.findOne({ email: email })
        if (user == null || !(await bcrypt.compare(password, user.password))) return done(null, false)
        return done(null, user)
    } catch (error) {
        return done(error)
    }
}))
passport.serializeUser(async (user, done) => {
    done(null, user.email)
})
passport.deserializeUser(async (email, done) => {
    const user = await Account.findOne({ email: email })
    done(null, user)
})

module.exports = passport
