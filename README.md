![SatTrack-Arcturus]()


**SatTrack-Arcturus** is a RESTful API built with Node.js and Express that lets you track and predict the orbit of artificial satellites through the use of the Simplified General Perturbations-4 (SGP4) model.


![Badge](https://img.shields.io/github/package-json/v/jpvitan/sattrack-arcturus)
![Badge](https://img.shields.io/github/license/jpvitan/sattrack-arcturus)


[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)


## 📋 Quick Guide


### Create an Account


To start using our APIs, sign up for an account using our registration page. After filling in your details and agreeing to our terms, proceed to your account dashboard and follow the next step.


### Generate a Key


From your account dashboard, locate and click **Keys**. This will take you to a page where you can create and manage your API keys.


![Dashboard]()


On **Keys**, click **Generate Key** to generate a new API key. Give your key a descriptive name to help you remember the purpose of this key.


![Keys]()


Be sure to **copy and securely store your API key**. This key is used to authenticate your API requests and will not be displayed again for security reasons.  


### Send a Request


Now that you have successfully generated your API key, you can start making requests to our APIs. As an example, let's track the **International Space Station (ISS)** using its **NORAD ID (25544)**.


```bash
curl -X GET "https://sattrack-arcturus.onrender.com/api/satellites/25544/orbit" -H "x-key: 65f4b4ac7ed8b0ee4708762d-82127ab2-5f7d-43ab-8bdb-1b5f6e7495c0"
```


Upon successful validation of your API key, the server will deliver a JSON response outlining the projected orbit of the ISS. This data includes current position coordinates, altitude, and timestamps indicating the time of calculation or validity.


```json
[
    {
        "latitude": -29.83176282952035,
        "longitude": -17.791634597028697,
        "altitude": 425.47637939396554,
        "timestamp": 1722302245049
    },
    {
        "latitude": -29.877054251036,
        "longitude": -17.742749072591728,
        "altitude": 425.50155548510884,
        "timestamp": 1722302246049
    },
    {
        "latitude": -29.92232380592562,
        "longitude": -17.693815963397814,
        "altitude": 425.5267315227802,
        "timestamp": 1722302247049
    },
    {
        "latitude": -29.96757325655348,
        "longitude": -17.64483318980932,
        "altitude": 425.5519084407706,
        "timestamp": 1722302248049
    },
    {
        "latitude": -30.012798904215092,
        "longitude": -17.59580458571464,
        "altitude": 425.57708413411547,
        "timestamp": 1722302249049
    },
    {
        "latitude": -30.058002511925817,
        "longitude": -17.546728075249344,
        "altitude": 425.6022595365748,
        "timestamp": 1722302250049
    },
    {
        "latitude": -30.10318402170901,
        "longitude": -17.49760354885829,
        "altitude": 425.6274345690126,
        "timestamp": 1722302251049
    },
    {
        "latitude": -30.14834337538912,
        "longitude": -17.448430898218447,
        "altitude": 425.6526091522146,
        "timestamp": 1722302252049
    },
    {
        "latitude": -30.19348051470075,
        "longitude": -17.399210016526993,
        "altitude": 425.6777832069938,
        "timestamp": 1722302253049
    },
    {
        "latitude": -30.23859538127006,
        "longitude": -17.349940795188193,
        "altitude": 425.7029566541378,
        "timestamp": 1722302254049
    }
]
```


That's it! Should you have any questions or need further assistance while using our services, please feel free to reach out. Our team is ready and eager to help you make the most of our API. Happy tracking!


## 🛠️ Software


### Developer


Built by [Justine Paul Vitan](https://jpvitan.com) as a solo project to demonstrate his capabilities in developing back-end applications with Node.js and Express. The source code of this project is open and available to the public via GitHub for transparency and open-source collaboration.


### License


This project is under the [MIT license](https://github.com/jpvitan/sattrack-arcturus/blob/master/LICENSE). Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.


## ⚠️ Issues


### Trackable Satellites


Tracking is supported only for satellites with a valid TLE (Two-Line Element). Satellites without a TLE cannot be tracked. You can explore a list of trackable satellites [here](https://sattrack-arcturus.onrender.com/help/track).


![Track]()


### Notice on Initial Response Times


Users may experience slower response times for the first request to the API. This is a temporary issue related to our use of Render's free plan. We appreciate your understanding as we work to improve this.