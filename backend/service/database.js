const mongoose = require('mongoose');
const UserModel = require('../model/user');
const BookModel = require('../model/book');
const GenreModel = require('../model/genre');
const AttachmentModel = require('../model/attachment');

const dbName = 'TEST_DB';//process.env.BOOKLING_DB_NAME;
const dbHost = '127.0.0.1';//process.env.BOOKLING_DB_HOST;
const dbPort = 27017;//process.env.BOOKLING_DB_PORT;
mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`, (err) => {
    if (err) throw err;
    console.log('Successfull connect');
});

// USER METHODS
const findAllUsers = (res, size) => {
    UserModel.find({})
    .limit(size)
    .then((users) => {
        res.send(users);
    });
};

const findUserById = (res, id) => {
    UserModel.findById(id)
    .then((user) => {
        res.send(user);
    });
};

const saveUser = (json) => {
    let user = new UserModel(json);  
    user.save((err) => {
        if(err) throw err;
        console.log(`Create '${user._name}' user!`);
    }); 
};

const updateUser = (json) => {
    let user = new UserModel(json); 
    UserModel.update({ "_id": user._id }, user, (err, raw) => {
        if(err) throw err;
        console.log(`Edit '${raw._name}' user!`);
    });
};

const deleteUser = (id) => {
    UserModel.deleteOne({ "_id": id }, (err) => {
        if(err) throw err;
        console.log(`Delete user by id=${id}!`);
    });
};

// BOOK METHODS
const findAllBooks = (res, size) => {
    BookModel.find({})
    .limit(size)
    .then((books) => {
        res.send(books);
    });
};

const findBookById = (res, id) => {
    BookModel.findById(id)
    .then((book) => {
        res.send(book);
    });
};

const saveBook = (json) => {
    let book = new BookModel(json);  
    book.save((err) => {
        if(err) throw err;
        console.log(`Create '${book._name}' book!`);
    }); 
};

const updateBook = (json) => {
    let book = new BookModel(json); 
    BookModel.update({ "_id": book._id },book,(err, raw) => {
        if(err) throw err;
        console.log(`Edit '${raw._name}' book!`);
    });
};

const deleteBook = (id) => {
    BookModel.deleteOne({ "_id": id }, (err) => {
        if(err) throw err;
        console.log(`Delete book by id=${id}!`);
    });
};

// GENRE Methods
const findAllGenres = (res, size) => {
    GenreModel.find({})
    .limit(size)
    .then((genres) => {
        res.send(genres);
    });
};

const findGenreById = (res, id) => {
    GenreModel.findById(id)
    .then((genre) => {
        res.send(genre);
    });
};

const saveGenre = (json) => {
    let genre = new GenreModel(json);  
    genre.save((err) => {
        if(err) throw err;
        console.log(`Create '${genre._name}' genre!`);
    }); 
};

const updateGenre = (json) => {
    let genre = new GenreModel(json); 
    GenreModel.update({ "_id": genre._id }, genre, (err, raw) => {
        if(err) throw err;
        console.log(`Edit '${raw._name}' genre!`);
    });
};

const deleteGenre = (id) => {
    GenreModel.deleteOne({ "_id": id }, (err) => {
        if(err) throw err;
        console.log(`Delete genre by id=${id}!`);
    });
};

// Attachments
const saveAttachment = (json) => {
    let attach = new AttachmentModel(json);
    AttachmentModel.save((err) => {
        if(err) throw err;
        console.log(`Create '${genre._name}' attachment!`);
    });
};

module.exports = { 
    findAllUsers, findUserById, saveUser, updateUser, deleteUser,
    findAllBooks, findBookById, saveBook, updateBook, deleteBook,
    findAllGenres, findGenreById, saveGenre, updateGenre, deleteGenre,
    saveAttachment
};