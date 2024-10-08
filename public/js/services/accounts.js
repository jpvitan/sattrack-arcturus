/*

SatTrack-Arcturus
A RESTful API built with Node.js and Express that lets you track and predict the orbit of artificial satellites through the use of the Simplified General Perturbations-4 (SGP4) model.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/sattrack-arcturus/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

export default class Account {
  static async create ({ name, email, username, password, repeat, token }) {
    const output = { response: null, message: null, success: false }

    if (!name || !email || !username || !password || !repeat) {
      output.message = 'Please enter valid values for all fields!'
      return output
    }
    if (password.length < 8) {
      output.message = 'Your password should be at least 8 characters long.'
      return output
    }
    if (password !== repeat) {
      output.message = 'Your passwords do not match. Please try again.'
      return output
    }
    if (!token) {
      output.message = 'It looks like there was an issue with the verification. Please ensure you have completed the Turnstile challenge correctly.'
      return output
    }

    try {
      output.response = await fetch(
        '/api/accounts',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, username, password, token })
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
      case 403:
        output.message = 'Your token is invalid, or you are not authorized to do this action. Please try again.'
        break
      case 409:
        output.message = 'The username that you have provided already exists.'
        break
      default:
        output.message = 'The system encountered some unexpected errors. Please try again later.'
    }

    return output
  }

  static async update ({ username, update }) {
    const output = { response: null, message: null, success: false }

    if (!username) {
      output.message = 'Please enter a valid value for username!'
      return output
    }
    if (!update) {
      output.message = 'Please specify which field to update.'
      return output
    }

    try {
      output.response = await fetch(
        `/api/accounts/${username}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(update)
        }
      )
    } catch (error) {
      output.message = 'The system encountered some unexpected errors. Please try again later.'
      return output
    }

    switch (output.response.status) {
      case 200:
        output.message = 'The system successfully updated your account.'
        output.success = true
        break
      case 403:
        output.message = 'Your password is invalid, or you are not authorized to do this action. Please try again.'
        break
      default:
        output.message = 'The system encountered some unexpected errors. Please try again later.'
    }

    return output
  }

  static async delete ({ username, password }) {
    const output = { response: null, message: null, success: false }

    if (!username) {
      output.message = 'Please enter a valid value for username!'
      return output
    }
    if (!password) {
      output.message = 'Please enter a valid value for password!'
      return output
    }

    try {
      output.response = await fetch(
        `/api/accounts/${username}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password })
        }
      )
    } catch (error) {
      output.message = 'The system encountered some unexpected errors. Please try again later.'
      return output
    }

    switch (output.response.status) {
      case 200:
        output.message = 'The system successfully deleted your account.'
        output.success = true
        break
      case 403:
        output.message = 'Your password is invalid, or you are not authorized to do this action. Please try again.'
        break
      default:
        output.message = 'The system encountered some unexpected errors. Please try again later.'
    }

    return output
  }
}
