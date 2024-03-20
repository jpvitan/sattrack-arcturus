/*

SatTrack-Arcturus
A RESTful API built with Node.js and Express that lets you retrieve useful satellite information by providing identifiers assigned by the North American Aerospace Defense Command.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/sattrack-arcturus/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

export default class Key {
  static async create ({ name, username }) {
    const output = { response: null, message: null, success: false }

    if (!name || !username) {
      output.message = 'Please enter valid values for all fields!'
      return output
    }

    try {
      output.response = await fetch(
        `/api/accounts/${username}/keys`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name })
        }
      )
    } catch (error) {
      output.message = 'The system encountered some unexpected errors. Please try again later.'
      return output
    }

    switch (output.response.status) {
      case 201:
        output.message = 'The system successfully created your key.'
        output.success = true
        break
      case 403:
        output.message = 'The system cannot generate another key because your capacity is full. Please take a moment to assess your current key usage and consider deactivating any unnecessary keys to make room for new ones.'
        break
      default:
        output.message = 'The system encountered some unexpected errors. Please try again later.'
    }

    return output
  }

  static async read ({ username }) {
    const output = { response: null, message: null, success: false }

    if (!username) {
      output.message = 'Please enter valid values for all fields!'
      return output
    }

    try {
      output.response = await fetch(
        `/api/accounts/${username}/keys`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        }
      )
    } catch (error) {
      output.message = 'The system encountered some unexpected errors. Please try again later.'
      return output
    }

    switch (output.response.status) {
      case 200:
        output.message = 'The system successfully retrieved your keys.'
        output.success = true
        break
      default:
        output.message = 'The system encountered some unexpected errors. Please try again later.'
    }

    return output
  }

  static async update ({ username, id, update }) {
    const output = { response: null, message: null, success: false }

    if (!username) {
      output.message = 'Please enter a valid value for username!'
      return output
    }
    if (!id) {
      output.message = 'Please enter a valid value for id!'
      return output
    }
    if (!update) {
      output.message = 'Please specify which field to update.'
      return output
    }

    try {
      output.response = await fetch(
        `/api/accounts/${username}/keys/${id}`,
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
        output.message = 'The system successfully updated your key.'
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

  static async delete ({ username, id }) {
    const output = { response: null, message: null, success: false }

    if (!username) {
      output.message = 'Please enter a valid value for username!'
      return output
    }
    if (!id) {
      output.message = 'Please enter a valid value for id!'
      return output
    }

    try {
      output.response = await fetch(
        `/api/accounts/${username}/keys/${id}`,
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
        output.message = 'The system successfully deleted your key.'
        output.success = true
        break
      default:
        output.message = 'The system encountered some unexpected errors. Please try again later.'
    }

    return output
  }
}
