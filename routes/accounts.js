/*

sattrack-node
RESTful API for retrieving useful satellite information.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

const express = require('express')
const bcrypt = require('bcrypt')
const Account = require('../models/account')

const router = express.Router()

router.post('/signup', async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const name = req.body.name

        const hashedPassword = await bcrypt.hash(password, 10)

        const account = new Account({ email: email, password: hashedPassword, name: name })
        account.save()
    } catch {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
    return res.status(201).json({ message: 'Account Created' })
})

module.exports = router
