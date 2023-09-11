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
  setupSignIn()
  setupSignUp()
  setupHome()
})

const setupSignIn = () => {
  const signIn = document.getElementById('sign-in')
  const signInCloseButton = document.getElementById('sign-in-close-button')
  const signInNotice = document.getElementById('sign-in-notice')
  const signInForm = document.getElementById('sign-in-form')
  const signInUsernameForm = document.getElementById('sign-in-username-form')
  const signInPasswordForm = document.getElementById('sign-in-password-form')

  signInCloseButton.onclick = () => {
    signIn.classList.add('d-none')
  }
  signInForm.onsubmit = async (e) => {
    e.preventDefault()

    const username = signInUsernameForm.value
    const password = signInPasswordForm.value

    if (username === '' || password === '') {
      signInNotice.innerText = 'Please enter a username and password.'
      return
    }

    try {
      const response = await fetch(
        '/sessions',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        }
      )
      if (response.ok) {

      } else if (response.status === 401) {
        signInNotice.innerText = 'The username and password you entered does not correspond to any existing account.'
      } else {
        signInNotice.innerText = 'The system encountered some unexpected errors. Please try again later.'
      }
    } catch (error) {
      signInNotice.innerText = 'The system encountered some unexpected errors. Please try again later.'
    }
  }
}

const setupSignUp = () => {
  const signUp = document.getElementById('sign-up')
  const signUpCloseButton = document.getElementById('sign-up-close-button')

  signUpCloseButton.onclick = () => {
    signUp.classList.add('d-none')
  }
}

const setupHome = () => {
  const signIn = document.getElementById('sign-in')
  const signInButton = document.getElementById('sign-in-button')
  const signUp = document.getElementById('sign-up')
  const signUpButton = document.getElementById('sign-up-button')

  signInButton.onclick = () => {
    signIn.classList.remove('d-none')
  }
  signUpButton.onclick = () => {
    signUp.classList.remove('d-none')
  }
}
