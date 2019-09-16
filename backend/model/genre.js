const mongoose = require('mongoose');
const uuid = require('node-uuid');

const Schema = mongoose.Schema;
const invalidMessage = 'Incorrect name length!';

/**
 * Genre to categorize books.
 */
const GenreModelSchema = new Schema({
    _id: {
       type: String,
       default: () => uuid.v4(),
       unique: true
    },
    _name: {
        type: String,
        minlength: [1, invalidMessage],
        maxlength: [20, invalidMessage],
        unique: false
    },
    _creationDate: {
        type: Date,
        default: () => Date.now()
    },
    _modificationDate: {
        type: Date,
        default: () => Date.now()
    },
});

const GenreModel = mongoose.model('Genre', GenreModelSchema);

module.exports = GenreModel;