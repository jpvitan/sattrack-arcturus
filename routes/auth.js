/*

sattrack-node
RESTful API for retrieving useful satellite information.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

module.exports.checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    return res.status(401).json({ message: 'Not Authenticated' })
}
