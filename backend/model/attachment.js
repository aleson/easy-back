const mongoose = require('mongoose');
const uuid = require('node-uuid');

const Schema = mongoose.Schema;
const invalidExtension = 'Incorrect extension!';
const invalidFileSize = 'Invalid file size!';

/**
 * Attachment may be photo of users/authors/books or documents(books).
 */
const AttachmentModelSchema = new Schema({
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
    _url: String,
    _type: {
        type: String,
        enum: ['Photo', 'Book']
    },
    _reference: Schema.Types.ObjectId,
    _creationDate: {
        type: Date,
        default: () => Date.now()
    },
    _modificationDate: {
        type: Date,
        default: () => Date.now()
    },
});

const AttachmentModel = mongoose.model('Attachment', AttachmentModelSchema);

module.exports = UserModel;