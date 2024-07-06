/*

SatTrack-Arcturus
A RESTful API built with Node.js and Express that lets you track and predict the orbit of artificial satellites through the use of the Simplified General Perturbations-4 (SGP4) model.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/sattrack-arcturus/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

export default class Satellite {
  static async create({ name, norad, country, purpose }) {
    const output = { response: null, message: null, success: false }

    if (!name || !norad || !country || !purpose) {
      output.message = 'Please enter valid values for all fields!'
      return output
    }

    try {
      output.response = await fetch(
        '/api/satellites',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, norad, country, purpose })
        }
      )
    } catch (error) {
      output.message = 'The system encountered some unexpected errors. Please try again later.'
      return output
    }

    switch (output.response.status) {
      case 201:
        output.message = 'The system successfully created the satellite.'
        output.success = true
        break
      default:
        output.message = 'The system encountered some unexpected errors. Please try again later.'
    }

    return output
  }

  static async update({ norad, update }) {
    const output = { response: null, message: null, success: false }

    if (!norad) {
      output.message = 'Please enter a valid value for NORAD!'
      return output
    }
    if (!update) {
      output.message = 'Please specify which field to update.'
      return output
    }

    try {
      output.response = await fetch(
        `/api/accounts/${norad}`,
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
        output.message = 'The system successfully updated the satellite.'
        output.success = true
        break
      default:
        output.message = 'The system encountered some unexpected errors. Please try again later.'
    }

    return output
  }
}
