const mongoose = require('mongoose');
const uuid = require('node-uuid');

const Schema = mongoose.Schema;

const minValueCharacterOfName = 3;
const maxValueCharacterOfName = 100;
const invalidName = ` must have from ${minValueCharacterOfName} to ${maxValueCharacterOfName} characters`;
const invalidNameLength = `Name ${invalidName}!`;

/**
 * Book is view of book object.
 */
const BookModelSchema = new Schema({
    _id: {
       type: String,
       default: () => uuid.v4(),
       unique: true
    },
    _name: {
        type: String,
        minlength: [minValueCharacterOfName, invalidNameLength],
        maxlength: [maxValueCharacterOfName, invalidNameLength],
        unique: true
    },
    _genre: {
        type: String,
        ref: 'Genre',
    },
    _description: {
        type: String,
        unique: false
    },
    _userId: {
        type: String,
        ref: 'User', 
        required: true
    },
    _fileId: {
        type: String,
        ref: 'Attachment',
        required: true
    },
    _creationDate: {
        type: Date,
        default: () => Date.now()
    },
    _modificationDate: {
        type: Date,
        default: () => Date.now()
    }
});

const BookModel = mongoose.model('Book', BookModelSchema);

module.exports = BookModel;