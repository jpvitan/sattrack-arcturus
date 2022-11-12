/*

sattrack-node
RESTful API for retrieving useful satellite information.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

const express = require('express')
const bcrypt = require('bcrypt')
const passport = require('passport')
const Account = require('../models/account')

const router = express.Router()

router.post('/signup', async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const name = req.body.name

        const user = await Account.findOne({ email: email })
        if (user) return res.status(409).json({ message: 'Account Exists' })

        const hashedPassword = await bcrypt.hash(password, 10)

        const account = new Account({ email: email, password: hashedPassword, name: name })
        account.save((error, result) => {
            if (error) {
                return res.status(500).json({ message: 'Internal Server Error' })
            } else {
                return res.status(201).json({ message: 'Account Created' })
            }
        })
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
})

router.post('/signin', passport.authenticate('local'), async (req, res) => {
    return res.status(200).json({ message: 'Account Verified' })
})

router.post('/signout', async (req, res) => {
    req.logout((error) => {
        if (error) return res.status(500).json({ message: 'Internal Server Error' })
        return res.status(200).json({ message: 'Account Signed Out' })
    })
})

module.exports = router
