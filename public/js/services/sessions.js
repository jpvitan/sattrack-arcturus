/*

SatTrack-Arcturus
A RESTful API built with Node.js and Express that lets you track and predict the orbit of artificial satellites through the use of the Simplified General Perturbations-4 (SGP4) model.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/sattrack-arcturus/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

export default class Session {
  static async login ({ username, password, token }) {
    const output = { response: null, message: null, success: false }

    if (!username || !password) {
      output.message = 'Please enter a valid username and password.'
      return output
    }
    if (!token) {
      output.message = 'It looks like there was an issue with the verification. Please ensure you have completed the Turnstile challenge correctly.'
      return output
    }

    try {
      output.response = await fetch(
        '/sessions',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password, token })
        }
      )
    } catch (error) {
      output.message = 'The system encountered some unexpected errors. Please try again later.'
      return output
    }

    switch (output.response.status) {
      case 200:
        output.message = 'The system has successfully logged you in.'
        output.success = true
        break
      case 401:
        output.message = 'The username and password you entered does not correspond to any existing account.'
        break
      default:
        output.message = 'The system encountered some unexpected errors. Please try again later.'
    }

    return output
  }

  static async logout () {
    const output = { response: null, message: null, success: false }

    try {
      output.response = await fetch(
        '/sessions',
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        }
      )
    } catch (error) {
      output.message = 'The system encountered some unexpected errors. Please try again later.'
      return output
    }

    switch (output.response.status) {
      case 200:
        output.message = 'The system has successfully logged you out.'
        output.success = true
        break
      default:
        output.message = 'The system encountered some unexpected errors. Please try again later.'
    }

    return output
  }
}
