/*

SatTrack-Arcturus
A RESTful API built with Node.js and Express that lets you retrieve useful satellite information by providing identifiers assigned by the North American Aerospace Defense Command.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/sattrack-arcturus/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

export default class Account {
  static async create ({ name, email, username, password, repeat }) {
    const output = { response: null, message: null, success: false }

    if (!name || !email || !username || !password || !repeat) {
      output.message = 'Please enter valid values for all fields!'
      return output
    }
    if (password !== repeat) {
      output.message = 'Your passwords do not match. Please try again.'
      return output
    }

    try {
      output.response = await fetch(
        '/api/accounts',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, username, password })
        }
      )
    } catch (error) {
      output.message = 'The system encountered some unexpected errors. Please try again later.'
      return output
    }

    switch (output.response.status) {
      case 201:
        output.message = 'The system successfully created your account.'
        output.success = true
        break
      case 409:
        output.message = 'The username that you have provided already exists.'
        break
      default:
        output.message = 'The system encountered some unexpected errors. Please try again later.'
    }

    return output
  }
}
