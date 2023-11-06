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
  setupDashboard()
  setupAccount()
  setupKeys()
  setupSatellite()
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

const setupDashboard = () => {
  const dashboard = document.getElementById('dashboard')
  const account = document.getElementById('account')
  const accountButton = document.getElementById('account-button')
  const keys = document.getElementById('keys')
  const keysItem = document.getElementById('keys-item')
  const satellite = document.getElementById('satellite')
  const satelliteItem = document.getElementById('satellite-item')

  if (!dashboard) return

  accountButton.onclick = () => { account.classList.remove('d-none') }
  keysItem.onclick = () => { keys.classList.remove('d-none') }
  satelliteItem.onclick = () => { satellite.classList.remove('d-none') }
}

const setupAccount = () => {
  const account = document.getElementById('account')
  const accountCloseButton = document.getElementById('account-close-button')
  const accountUsernameForm = document.getElementById('account-username-form')
  const accountChangePasswordButton = document.getElementById('account-change-password-button')
  const accountDeleteAccountButton = document.getElementById('account-delete-account-button')
  const accountNotice = document.getElementById('account-notice')
  const accountUpdateButton = document.getElementById('account-update-button')

  const field = [
    { id: 'account-email-form', key: 'email' },
    { id: 'account-name-form', key: 'name' }
  ]
  field.forEach(field => { field.reference = document.getElementById(field.id) })

  if (!account) return

  accountCloseButton.onclick = () => { account.classList.add('d-none') }
  accountChangePasswordButton.onclick = () => { }
  accountDeleteAccountButton.onclick = () => { }
  accountUpdateButton.onclick = async () => {
    const username = accountUsernameForm.value
    const update = {}
    field.forEach(({ key, reference }) => { update[key] = reference.value })

    const output = await Account.update({ username, update })

    accountNotice.innerHTML = output.message
    accountNotice.classList.remove('text-color-red')

    if (!output.success) {
      accountNotice.classList.add('text-color-red')
      return
    }
  }
}

const setupKeys = () => {
  const keys = document.getElementById('keys')
  const keysCloseButton = document.getElementById('keys-close-button')

  if (!keys) return

  keysCloseButton.onclick = () => { keys.classList.add('d-none') }
}

const setupSatellite = () => {
  const satellite = document.getElementById('satellite')
  const satelliteCloseButton = document.getElementById('satellite-close-button')

  if (!satellite) return

  satelliteCloseButton.onclick = () => { satellite.classList.add('d-none') }
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

    if (!output.success) {
      signInNotice.innerHTML = output.message
      signInNotice.classList.add('text-color-red')
      return
    }

    window.location.assign('dashboard')
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

    if (!output.success) {
      signUpNotice.innerHTML = output.message
      signUpNotice.classList.add('text-color-red')
      return
    }

    const login = await Session.login({ username: data.username, password: data.password })

    if (!login.success) {
      signUpNotice.innerHTML = login.message
      signUpNotice.classList.add('text-color-red')
      return
    }

    window.location.assign('dashboard')
  }
}
