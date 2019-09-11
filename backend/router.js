const express = require('express');
const router = express.Router();
const media = express.static('media');

// Home page route
router.get('/', (req, res) => {
  res.send('home page');
});

// About page route
router.get('/about', (req, res) => {
  res.send('About this site');
});

module.exports = {router, media};