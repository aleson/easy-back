const express = require('express');
const router = express.Router();
const media = express.static('media');
const bodyParser = require('body-parser');

const db = require('./database');
const UserModel = require('./model/user');



const urlencodedParser = bodyParser.urlencoded({extended: false});

// Home page route
router.get('/', (req, res) => {
  res.send('home page');
});

// About page route
router.get('/about', (req, res) => {
  res.send('About this site');
});

// Users list
router.get('/users', urlencodedParser, (req, res) => {
  db.allUsers(res);
});

router.post('/user/save', urlencodedParser, (req, res) => {
  if(!req.body) return res.sendStatus(400);
  console.log(`req.body = ${JSON.stringify(req.body)}`);
  db.saveUser(req.body);
  res.send('Success!');
});

module.exports = {router, media};