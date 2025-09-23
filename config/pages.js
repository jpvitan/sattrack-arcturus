/*

SatTrack-Arcturus
A RESTful API built with Node.js and Express that lets you track and predict the orbit of artificial satellites through the use of the Simplified General Perturbations-4 (SGP4) model.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/sattrack-arcturus/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

const page = {
  '/': {
    view: 'pages/index',
    title: 'SatTrack-Arcturus',
    description: 'A RESTful API built with Node.js and Express that lets you track and predict the orbit of artificial satellites through the use of the Simplified General Perturbations-4 (SGP4) model.'
  },
  '/accounts/console': {
    view: 'pages/accounts/console',
    title: 'Console | SatTrack-Arcturus',
    description: 'A RESTful API built with Node.js and Express that lets you track and predict the orbit of artificial satellites through the use of the Simplified General Perturbations-4 (SGP4) model.'
  },
  '/accounts/dashboard': {
    view: 'pages/accounts/dashboard',
    title: 'Dashboard | SatTrack-Arcturus',
    description: 'A RESTful API built with Node.js and Express that lets you track and predict the orbit of artificial satellites through the use of the Simplified General Perturbations-4 (SGP4) model.'
  },
  '/help/plans': {
    view: 'pages/help/plans',
    title: 'Plans | SatTrack-Arcturus',
    description: 'A RESTful API built with Node.js and Express that lets you track and predict the orbit of artificial satellites through the use of the Simplified General Perturbations-4 (SGP4) model.'
  },
  '/help/start': {
    view: 'pages/help/start',
    title: 'Getting Started | SatTrack-Arcturus',
    description: 'A RESTful API built with Node.js and Express that lets you track and predict the orbit of artificial satellites through the use of the Simplified General Perturbations-4 (SGP4) model.'
  },
  '/help/track': {
    view: 'pages/help/track',
    title: 'Trackable Satellites | SatTrack-Arcturus',
    description: 'A RESTful API built with Node.js and Express that lets you track and predict the orbit of artificial satellites through the use of the Simplified General Perturbations-4 (SGP4) model.'
  },
  '/legal/tos': {
    view: 'pages/legal/tos',
    title: 'Terms of Service | SatTrack-Arcturus',
    description: 'A RESTful API built with Node.js and Express that lets you track and predict the orbit of artificial satellites through the use of the Simplified General Perturbations-4 (SGP4) model.'
  },
  '/legal/privacy': {
    view: 'pages/legal/privacy',
    title: 'Privacy Policy | SatTrack-Arcturus',
    description: 'A RESTful API built with Node.js and Express that lets you track and predict the orbit of artificial satellites through the use of the Simplified General Perturbations-4 (SGP4) model.'
  }
}

module.exports = page
