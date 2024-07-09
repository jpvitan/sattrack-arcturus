/*

SatTrack-Arcturus
A RESTful API built with Node.js and Express that lets you track and predict the orbit of artificial satellites through the use of the Simplified General Perturbations-4 (SGP4) model.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/sattrack-arcturus/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

import Account from './services/accounts.js'
import Keys from './services/keys.js'
import Satellite from './services/satellites.js'
import Session from './services/sessions.js'

document.addEventListener('DOMContentLoaded', () => {
  setupHome()
  setupConsole()
  setupDashboard()
  setupFiller()
})

window.addEventListener('resize', () => {
  setupFiller()
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

  setupSignIn()
  setupSignUp()
}

const setupConsole = () => {
  const console = document.getElementById('console')

  const page = {
    satellite: {
      screen: document.getElementById('satellite'),
      button: document.getElementById('satellite-button'),
      close: document.getElementById('satellite-close-button')
    }
  }

  if (!console) return

  Object.entries(page).forEach(([key, { screen, button, close }]) => {
    button.onclick = () => {
      window.sessionStorage.setItem('page', key)
      screen.classList.remove('d-none')
    }
    close.onclick = () => {
      window.sessionStorage.removeItem('page')
      screen.classList.add('d-none')
    }
  })

  if (window.sessionStorage.getItem('page')) {
    const { screen } = page[window.sessionStorage.getItem('page')]
    screen.classList.remove('d-none')
  }

  setupConsoleSatellite()
}

const setupDashboard = () => {
  const dashboard = document.getElementById('dashboard')
  const dashboardData = document.getElementById('dashboard-data')

  const page = {
    account: {
      screen: document.getElementById('account'),
      button: document.getElementById('account-button'),
      close: document.getElementById('account-close-button')
    },
    keys: {
      screen: document.getElementById('keys'),
      button: document.getElementById('keys-button'),
      close: document.getElementById('keys-close-button')
    },
    credits: {
      screen: document.getElementById('credits'),
      button: document.getElementById('credits-button'),
      close: document.getElementById('credits-close-button')
    },
    updates: {
      screen: document.getElementById('updates'),
      button: document.getElementById('updates-button'),
      close: document.getElementById('updates-close-button')
    }
  }

  if (!dashboard) return

  Object.entries(page).forEach(([key, { screen, button, close }]) => {
    button.onclick = () => {
      window.sessionStorage.setItem('page', key)
      screen.classList.remove('d-none')
    }
    close.onclick = () => {
      window.sessionStorage.removeItem('page')
      screen.classList.add('d-none')
    }
  })

  if (window.sessionStorage.getItem('page')) {
    const { screen } = page[window.sessionStorage.getItem('page')]
    screen.classList.remove('d-none')
  }

  const { capacity, usage } = dashboardData.dataset

  setupCapacityProgressBar({ capacity })
  setupUsageChart({ usage: JSON.parse(usage) })
  setupDashboardAccount()
  setupDashboardKeys()
}

const setupFiller = () => {
  const filler = document.getElementById('filler')
  const footer = document.getElementById('footer')

  if (!filler) return

  const space = window.innerHeight - filler.offsetTop - footer.offsetHeight

  filler.style.height = `${space}px`
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

    const { type } = await output.response.json()

    const page = {
      user: 'dashboard',
      admin: 'console'
    }

    window.location.assign(page[type])
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

const setupConsoleSatellite = () => {
  const satellite = document.getElementById('satellite')
  const satelliteUpdateTLENotice = document.getElementById('satellite-update-tle-notice')
  const satelliteUpdateTLEButton = document.getElementById('satellite-update-tle-button')
  const satelliteUpdateTLEFile = document.getElementById('satellite-update-tle-file')

  if (!satellite) return

  satelliteUpdateTLEButton.onclick = async () => {
    satelliteUpdateTLEFile.click()
  }
  satelliteUpdateTLEFile.onchange = async () => {
    const file = satelliteUpdateTLEFile.files[0]
    const fileReader = new FileReader()

    fileReader.onload = (e) => {
      const content = e.target.result
      const lines = content.split('\n')

      const payload = []

      for (let i = 0; i < lines.length; i += 2) {
        const line1 = lines[i]
        const line2 = lines[i + 1]

        const norad = line2.split(' ')[1]
        const update = { tle: [line1, line2] }

        payload.push({ norad, update })
      }
    }

    fileReader.readAsText(file)
  }
}

const setupCapacityProgressBar = ({ capacity }) => {
  const capacityProgressBar = document.getElementById('capacity-progress-bar')

  if (!capacityProgressBar) return

  capacityProgressBar.style.width = capacity + '%'
}

const setupUsageChart = ({ usage }) => {
  const usageChart = document.getElementById('usage-chart')

  if (!usageChart) return

  const chart = new Chart(usageChart, {
    type: 'bar',
    options: {
      backgroundColor: 'rgba(253, 121, 168, 1.0)',
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          border: {
            display: false
          },
          grid: {
            display: true
          },
          ticks: {
            precision: 0,
            font: {
              weight: 'bold'
            }
          }
        },
        y: {
          suggestedMin: 0,
          suggestedMax: 10,
          border: {
            display: false
          },
          grid: {
            display: true
          },
          ticks: {
            precision: 0,
            font: {
              weight: 'bold'
            }
          }
        }
      }
    },
    data: {
      labels: usage.map(({ month }) => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month - 1]),
      datasets: [
        {
          data: usage.map(({ hits }) => hits)
        }
      ]
    }
  })
}

const setupDashboardAccount = () => {
  const account = document.getElementById('account')
  const accountUsernameForm = document.getElementById('account-username-form')
  const accountChangePasswordNotice = document.getElementById('account-change-password-notice')
  const accountChangePasswordButton = document.getElementById('account-change-password-button')
  const accountDeleteAccountNotice = document.getElementById('account-delete-account-notice')
  const accountDeleteAccountButton = document.getElementById('account-delete-account-button')
  const accountSignOutButton = document.getElementById('account-sign-out-button')
  const accountNotice = document.getElementById('account-notice')
  const accountUpdateButton = document.getElementById('account-update-button')

  const changePassword = document.getElementById('change-password')
  const changePasswordOldPasswordForm = document.getElementById('change-password-old-password-form')
  const changePasswordNewPasswordForm = document.getElementById('change-password-new-password-form')

  const deleteAccount = document.getElementById('delete-account')
  const deleteAccountPasswordForm = document.getElementById('delete-account-password-form')

  const field = [
    { id: 'account-email-form', key: 'email' },
    { id: 'account-name-form', key: 'name' }
  ]
  field.forEach(field => { field.reference = document.getElementById(field.id) })

  if (!account) return

  accountChangePasswordButton.onclick = async () => {
    if (changePassword.classList.contains('d-none')) {
      changePassword.classList.remove('d-none')
      accountChangePasswordNotice.innerHTML = 'Please enter your password (old and new) and click <strong class="text-color-blue">Change Password</strong> to proceed.'
      return
    }

    const username = accountUsernameForm.value
    const password = changePasswordOldPasswordForm.value
    const raw = changePasswordNewPasswordForm.value
    const update = { password, raw }

    const output = await Account.update({ username, update })

    if (output.success) {
      await swal({
        title: 'Success',
        text: output.message,
        icon: 'success'
      })

      window.location.reload()
    } else {
      await swal({
        title: 'Error',
        text: output.message,
        icon: 'error'
      })

      accountChangePasswordNotice.innerHTML = output.message
      accountChangePasswordNotice.classList.add('text-color-red')
      accountChangePasswordNotice.classList.remove('text-color-black')
    }
  }
  accountDeleteAccountButton.onclick = async () => {
    if (deleteAccount.classList.contains('d-none')) {
      deleteAccount.classList.remove('d-none')
      accountDeleteAccountNotice.innerHTML = 'Please enter your password and click <strong class="text-color-red">Delete Account</strong> to proceed.'
      return
    }

    const username = accountUsernameForm.value
    const password = deleteAccountPasswordForm.value

    const output = await Account.delete({ username, password })

    if (output.success) {
      await swal({
        title: 'Success',
        text: output.message,
        icon: 'success'
      })

      window.location.assign('/')
    } else {
      await swal({
        title: 'Error',
        text: output.message,
        icon: 'error'
      })

      accountDeleteAccountNotice.innerHTML = output.message
      accountDeleteAccountNotice.classList.add('text-color-red')
      accountDeleteAccountNotice.classList.remove('text-color-black')
    }
  }
  accountSignOutButton.onclick = async () => {
    const output = await Session.logout()

    if (output.success) {
      await swal({
        title: 'Success',
        text: output.message,
        icon: 'success'
      })

      window.location.assign('/')
    } else {
      await swal({
        title: 'Error',
        text: output.message,
        icon: 'error'
      })
    }
  }
  accountUpdateButton.onclick = async () => {
    const username = accountUsernameForm.value
    const update = {}
    field.forEach(({ key, reference }) => { update[key] = reference.value })

    const output = await Account.update({ username, update })

    if (output.success) {
      await swal({
        title: 'Success',
        text: output.message,
        icon: 'success'
      })

      window.location.reload()
    } else {
      await swal({
        title: 'Error',
        text: output.message,
        icon: 'error'
      })

      accountNotice.innerHTML = output.message
      accountNotice.classList.add('text-color-red')
    }
  }
}

const setupDashboardKeys = () => {
  const keys = document.getElementById('keys')
  const keysHiddenUsernameForm = document.getElementById('keys-hidden-username-form')
  const keysGenerateKeyNotice = document.getElementById('keys-generate-key-notice')
  const keysGenerateKeyButton = document.getElementById('keys-generate-key-button')
  const keysCopyKeyButton = document.getElementById('keys-copy-key-button')
  const keysStatusKeyButton = Array.from(document.getElementsByClassName('keys-status-key-button'))
  const keysDeleteKeyButton = Array.from(document.getElementsByClassName('keys-delete-key-button'))

  const generateKey = document.getElementById('generate-key')
  const generateKeyNameForm = document.getElementById('generate-key-name-form')

  if (!keys) return

  keysGenerateKeyButton.onclick = async () => {
    if (generateKey.classList.contains('d-none')) {
      generateKey.classList.remove('d-none')
      keysGenerateKeyNotice.innerHTML = 'Please enter a name for your key and click <strong class="text-color-blue">Generate Key</strong> to proceed.'
      return
    }

    const username = keysHiddenUsernameForm.value
    const name = generateKeyNameForm.value

    const output = await Keys.create({ name, username })

    if (output.success) {
      const data = await output.response.json()

      keysGenerateKeyNotice.innerHTML = 'To ensure the safety of your data, please <strong class="text-color-red">copy and securely store your key immediately</strong>. It won\'t be retrievable in the future as it will be hashed for enhanced security. Your key will be available under <strong>Manage Keys</strong> after manually reloading this page.'
      keysGenerateKeyNotice.classList.add('text-color-black')
      keysGenerateKeyNotice.classList.remove('text-color-red')
      generateKeyNameForm.value = data.key
      generateKeyNameForm.disabled = true
      keysGenerateKeyButton.classList.add('d-none')
      keysCopyKeyButton.classList.remove('d-none')
    } else {
      keysGenerateKeyNotice.innerHTML = output.message
      keysGenerateKeyNotice.classList.add('text-color-red')
      keysGenerateKeyNotice.classList.remove('text-color-black')
    }
  }
  keysCopyKeyButton.onclick = () => { navigator.clipboard.writeText(generateKeyNameForm.value) }
  keysStatusKeyButton.forEach((button) => {
    button.onclick = async () => {
      const username = keysHiddenUsernameForm.value
      const id = button.dataset.id
      const status = button.dataset.status

      const output = await Keys.update({ username, id, update: { status: (status === 'Deactivated') ? 'Active' : 'Deactivated' } })

      if (output.success) {
        await swal({
          title: 'Success',
          text: output.message,
          icon: 'success'
        })

        window.location.reload()
      } else {
        await swal({
          title: 'Error',
          text: output.message,
          icon: 'error'
        })
      }
    }
  })
  keysDeleteKeyButton.forEach((button) => {
    button.onclick = async () => {
      const username = keysHiddenUsernameForm.value
      const id = button.dataset.id

      const output = await Keys.delete({ username, id })

      if (output.success) {
        await swal({
          title: 'Success',
          text: output.message,
          icon: 'success'
        })

        window.location.reload()
      } else {
        await swal({
          title: 'Error',
          text: output.message,
          icon: 'error'
        })
      }
    }
  })
}
