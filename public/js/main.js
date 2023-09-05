/*

SatTrack-Arcturus
A RESTful API built with Node.js and Express that lets you retrieve useful satellite information by providing identifiers assigned by the North American Aerospace Defense Command.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/sattrack-arcturus/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

document.addEventListener('DOMContentLoaded', () => {
  setupHome()
})

const setupHome = () => {
  const signIn = document.getElementById('account-sign-in')
  const signUp = document.getElementById('account-sign-up')
  const signInButton = document.getElementById('account-sign-in-button')
  const signUpButton = document.getElementById('account-sign-up-button')
  const signInCloseButton = document.getElementById('account-sign-in-close-button')
  const signUpCloseButton = document.getElementById('account-sign-up-close-button')

  signInButton.onclick = () => {
    signIn.classList.remove('d-none')
  }
  signUpButton.onclick = () => {
    signUp.classList.remove('d-none')
  }
  signInCloseButton.onclick = () => {
    signIn.classList.add('d-none')
  }
  signUpCloseButton.onclick = () => {
    signUp.classList.add('d-none')
  }
}
