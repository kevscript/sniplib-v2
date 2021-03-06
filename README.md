## 1. About

SnipLib is an online dashboard app that allows you to create your own library of snippets.
Users are able to create code snippets in different languages, store and edit them.

<br /> <br />

![image of sniplib app](./images/sniplib-laptop.png)

<br /> <br />

## 2. Tech Stack

- React
- Redux (+ redux-thunk)
- Firebase (Auth + Realtime DB)
- styled-components

## 3. Installation

- ``npm install``

- create a Firebase web project

- create .env file on the root of your project

- add env variables for your Firebase initialization

```javascript
REACT_APP_FIREBASE_KEY="XXX"
REACT_APP_FIREBASE_DOMAIN="XXX"
REACT_APP_FIREBASE_DATABASE="XXX"
REACT_APP_FIREBASE_PROJECT_ID="XXX"
REACT_APP_FIREBASE_STORAGE_BUCKET="XXX"
REACT_APP_FIREBASE_SENDER_ID="XXX"
REACT_APP_FIREBASE_APP_ID="XXX"
```
