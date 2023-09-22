/*

SatTrack-Arcturus
A RESTful API built with Node.js and Express that lets you retrieve useful satellite information by providing identifiers assigned by the North American Aerospace Defense Command.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/sattrack-arcturus/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

import Account from './services/accounts.js'
import Session from './services/sessions.js'

document.addEventListener('DOMContentLoaded', () => {
  setupHome()
  setupSignIn()
  setupSignUp()
})

const setupHome = () => {
  const home = document.getElementById('home')
  const signIn = document.getElementById('sign-in')
  const signInButton = document.getElementById('sign-in-button')
  const signUp = document.getElementById('sign-up')
  const signUpButton = document.getElementById('sign-up-button')

  if (!home) return

  signInButton.onclick = () => { signIn.classList.remove('d-none') }
  signUpButton.onclick = () => { signUp.classList.remove('d-none') }
}

const setupSignIn = () => {
  const signIn = document.getElementById('sign-in')
  const signInCloseButton = document.getElementById('sign-in-close-button')
  const signInNotice = document.getElementById('sign-in-notice')
  const signInForm = document.getElementById('sign-in-form')
  const signInUsernameForm = document.getElementById('sign-in-username-form')
  const signInPasswordForm = document.getElementById('sign-in-password-form')

  if (!signIn) return

  signInCloseButton.onclick = () => { signIn.classList.add('d-none') }
  signInForm.onsubmit = async (e) => {
    e.preventDefault()

    const username = signInUsernameForm.value
    const password = signInPasswordForm.value
    const output = await Session.login({ username, password })

    if (output.success) {
      console.log('Success')
    } else {
      signInNotice.innerHTML = output.message
      signInNotice.classList.add('text-color-red')
    }
  }
}

const setupSignUp = () => {
  const signUp = document.getElementById('sign-up')
  const signUpCloseButton = document.getElementById('sign-up-close-button')
  const signUpNotice = document.getElementById('sign-up-notice')
  const signUpForm = document.getElementById('sign-up-form')

  const field = [
    { id: 'sign-up-name-form', key: 'name' },
    { id: 'sign-up-email-form', key: 'email' },
    { id: 'sign-up-username-form', key: 'username' },
    { id: 'sign-up-password-form', key: 'password' },
    { id: 'sign-up-repeat-form', key: 'repeat' }
  ]
  field.forEach(field => { field.reference = document.getElementById(field.id) })

  if (!signUp) return

  signUpCloseButton.onclick = () => { signUp.classList.add('d-none') }
  signUpForm.onsubmit = async (e) => {
    e.preventDefault()

    const data = {}
    field.forEach(({ key, reference }) => { data[key] = reference.value })

    const output = await Account.create(data)

    if (output.success) {
      console.log('Success')
    } else {
      signUpNotice.innerHTML = output.message
      signUpNotice.classList.add('text-color-red')
    }
  }
}
