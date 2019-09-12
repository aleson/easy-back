const express = require('express');
const router = express.Router();
const media = express.static('media');

const db = require('./database');

// Home page route
router.get('/', (req, res) => {
  res.send('home page');
});

// About page route
router.get('/about', (req, res) => {
  res.send('About this site');
});

// Users list
router.get('/users', (req, res) => {
  db.all('User', res);
});

module.exports = {router, media};