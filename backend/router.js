const express = require('express');
const router = express.Router();
const media = express.static('media');
const bodyParser = require('body-parser');

const db = require('./database');


const urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/', (req, res) => {
  res.send('home page');
});

router.get('/about', (req, res) => {
  res.send('About this site');
});

// Users or Authors
router.get('/user', urlencodedParser, (req,res) => {
  db.findUserById(res, req.param('_id'));
});

router.get('/users', urlencodedParser, (req, res) => {
  db.findAllUsers(res, 50);
});

router.post('/user/save', urlencodedParser, (req, res) => {
  if(!req.body) return res.sendStatus(400);
  console.log(`req.body = ${JSON.stringify(req.body)}`);
  db.saveUser(req.body);
  res.send('Success!');
});

router.put('/user/update', urlencodedParser, (req, res) => {
  if(!req.body) return res.sendStatus(400);
  db.updateUser(req.body);
  res.send('Success!');
});

router.delete('/user/delete', urlencodedParser, (req, res) => {
  if(!req.param('_id')) return res.sendStatus(400);
  db.deleteUser(req.param('_id'));
  res.send('Success!');
}); 

// Books
router.get('/book', urlencodedParser, (req,res) => {
  db.findBookById(res, req.param('_id'));
});

router.get('/books', urlencodedParser, (req, res) => {
  db.findAllBooks(res, 50);
});

router.post('/book/save', urlencodedParser, (req, res) => {
  if(!req.body) return res.sendStatus(400);
  console.log(`req.body = ${JSON.stringify(req.body)}`);
  db.saveBook(req.body);
  res.send('Success!');
});

router.put('/book/update', urlencodedParser, (req, res) => {
  if(!req.body) return res.sendStatus(400);
  db.updateBook(req.body);
  res.send('Success!');
});

router.delete('/book/delete', urlencodedParser, (req, res) => {
  if(!req.param('_id')) return res.sendStatus(400);
  db.deleteBook(req.param('_id'));
  res.send('Success!');
});

// Genres
router.get('/genre', urlencodedParser, (req,res) => {
  db.findGenreById(res, req.param('_id'));
});

router.get('/genres', urlencodedParser, (req, res) => {
  db.findAllGenres(res, 50);
});

router.post('/genre/save', urlencodedParser, (req, res) => {
  if(!req.body) return res.sendStatus(400);
  console.log(`req.body = ${JSON.stringify(req.body)}`);
  db.saveGenre(req.body);
  res.send('Success!');
});

router.put('/genre/update', urlencodedParser, (req, res) => {
  if(!req.body) return res.sendStatus(400);
  db.updateGenre(req.body);
  res.send('Success!');
});

router.delete('/genre/delete', urlencodedParser, (req, res) => {
  if(!req.param('_id')) return res.sendStatus(400);
  db.deleteGenre(req.param('_id'));
  res.send('Success!');
});

module.exports = {router, media};