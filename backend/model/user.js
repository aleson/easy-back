const mongoose = require('mongoose');
const uuid = require('node-uuid');

const Schema = mongoose.Schema;

const minValueCharacterOfName = 3;
const maxValueCharacterOfName = 40;
const invalidName = ` must have from ${minValueCharacterOfName} to ${maxValueCharacterOfName} characters`;
const invalidNameLength = `Name ${invalidName}!`;
const invalidPasswordLength = `Password must have more 8 symbols!`;

/**
 * This schema is view of users/authors/books.
 */
const UserModelSchema = new Schema({
    _id: {
       type: String,
       default: () => uuid.v4(),
       unique: true
    },
    _name: {
        type: String,
        minlength: [minValueCharacterOfName, invalidNameLength],
        maxlength: [maxValueCharacterOfName, invalidNameLength],
        unique: false
    },
    _surname: {
        type: String,
        minlength: [minValueCharacterOfName, invalidNameLength],
        maxlength: [maxValueCharacterOfName, invalidNameLength],
        unique: false
    },
    _description: {
        type: String,
        unique: false
    },
    _username: {
        type: String,
        minlength: [minValueCharacterOfName, invalidNameLength],
        maxlength: [maxValueCharacterOfName, invalidNameLength]
    },
    _password: {
        type: String,
        minlength: [8, invalidPasswordLength],
        unique: false
    },
    _photo: Buffer,
    _bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
    },
    _creationDate: {
        type: Date,
        default: () => Date.now()
    },
    _modificationDate: {
        type: Date,
        default: () => Date.now()
    },
    _url: String
});

const UserModel = mongoose.model('User', UserModelSchema);

module.exports = UserModel;