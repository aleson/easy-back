const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');

const db = require('./service/database');
const store = require('./service/storage');

const urlencodedParser = bodyParser.urlencoded({extended: true});
const filePath = `${__dirname}/media/file/`;
const photoPath = `${__dirname}/media/photo/`;

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

// Store files
router.post('/uploadfile', store.upload.single('_file'), (req, res, next) => {
  const file = req.file;
  if(!req.param('_type')) res.sendStatus(400);
  if (!file) {
    const error = new Error('Please upload a file!');
    error.httpStatusCode = 400;
    return next(error);
  }
  let path = filePath+file.originalname;
  if(req.param('_type') === 'Photo') {
    fs.rename(path, photoPath+file.originalname, (err) => {
      console.err('Error in move file');
    });
    path = photoPath+file.originalname;
  }
  try {
    db.saveAttachment({
      "_filename": file.originalname,
      "_type": req.param('_type'),
      "_url": req.param('_type') === 'Photo' ? `/media/photo/${file.originalname}` : `/media/file/${file.originalname}`,
      "_reference": req.param('_reference'),
      "_creationDate": Date.now(),
      "_modificationDate": Date.now()
    });
  } catch(err) {
    fs.unlinkSync(path);
    throw err;
  }

  res.send(file);
});

router.post('/uploadmultiple', store.upload.array('_files', 12), (req, res, next) => {
  // TODO add support multifiles
  const files = req.files;
  if (!files) {
    const error = new Error('Please choose files');
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(files);
});

router.get('/download', (req, res) => {
  if(!req.param('_filename') && !req.param('_type')) return res.sendStatus(400);
    let file = 'File' === req.param('_type') 
    ? `${filePath}${req.param('_filename')}` 
    : `${photoPath}/media/photo/${req.param('_filename')}`;
    if(!fs.existsSync(file)) {
      console.error(`${file} not found!`);
      res.status(406).send('File not found!');
    }
    res.sendFile(file);
});


module.exports = {router};