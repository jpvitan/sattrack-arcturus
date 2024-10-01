![SatTrack-Arcturus](https://github.com/jpvitan/sattrack-arcturus/blob/master/public/images/mockups/home.png)


**SatTrack-Arcturus** is a RESTful API built with Node.js and Express that lets you track and predict the orbit of artificial satellites through the use of the Simplified General Perturbations-4 (SGP4) model.


![Badge](https://img.shields.io/github/package-json/v/jpvitan/sattrack-arcturus)
![Badge](https://img.shields.io/github/license/jpvitan/sattrack-arcturus)


[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)


## 📋 Quick Guide


### Create an Account


To start using our APIs, sign up for an account using our registration page. After filling in your details and agreeing to our terms, proceed to your account dashboard and follow the next step.


### Generate a Key


From your account dashboard, locate and click **Keys**. This will take you to a page where you can create and manage your API keys.


![Dashboard](https://res.cloudinary.com/dhv9gcew6/image/upload/q_auto/v1721416012/sattrack-arcturus/screenshots/dashboard_rcqpok.png)


On **Keys**, click **Generate Key** to generate a new API key. Give your key a descriptive name to help you remember the purpose of this key.


![Keys](https://res.cloudinary.com/dhv9gcew6/image/upload/q_auto/v1721498698/sattrack-arcturus/screenshots/keys_movljm.png)


Be sure to **copy and securely store your API key**. This key is used to authenticate your API requests and will not be displayed again for security reasons.  


### Send a Request


Now that you have successfully generated your API key, you can start making requests to our APIs. As an example, let's track the **International Space Station (ISS)** using its **NORAD ID (25544)**.


```bash
curl -X GET "https://sattrack-arcturus.onrender.com/api/satellites/25544/orbit" -H "x-key: 65f4b4ac7ed8b0ee4708762d-82127ab2-5f7d-43ab-8bdb-1b5f6e7495c0"
```


## 🛠️ Software


### Developer


Built by [Justine Paul Vitan](https://jpvitan.com) as a solo project to demonstrate his capabilities in developing back-end applications with Node.js and Express. The source code of this project is open and available to the public via GitHub for transparency and open-source collaboration.


### License


This project is under the [MIT license](https://github.com/jpvitan/sattrack-arcturus/blob/master/LICENSE). Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.
