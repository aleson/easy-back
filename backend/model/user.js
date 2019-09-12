const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const minValueCharacterOfName = 3;
const maxValueCharacterOfName = 40;
const invalidName = ` must have from ${minValueCharacterOfName} to ${maxValueCharacterOfName} characters`;
const invalidNameLength = `Name ${invalidName}!`;
const invalidPasswordLength = `Password must have more 8 symbols!`;

const UserModelSchema = new Schema({
    _id: String,
    _name: {
        type: String,
        minlength: [minValueCharacterOfName, invalidNameLength],
        maxlength: [maxValueCharacterOfName, invalidNameLength]
    },
    _surname: {
        type: String,
        minlength: [minValueCharacterOfName, invalidNameLength],
        maxlength: [maxValueCharacterOfName, invalidNameLength]
    },
    _description: String,
    _username: {
        type: String,
        minlength: [minValueCharacterOfName, invalidNameLength],
        maxlength: [maxValueCharacterOfName, invalidNameLength]
    },
    _password: {
        type: String,
        minlength: [8, invalidPasswordLength]
    },
    // _photo: Buffer,
    // _bookId: Schema.Types.ObjectId
});

const UserModel = mongoose.model('UserModel', UserModelSchema);

module.exports = UserModel;