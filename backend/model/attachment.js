const mongoose = require('mongoose');
const uuid = require('node-uuid');

const Schema = mongoose.Schema;
const invalidExtension = 'Incorrect extension!';

/**
 * Attachment may be photo of users/authors/books or documents(books).
 */
const AttachmentModelSchema = new Schema({
    _id: {
       type: String,
       default: () => uuid.v4(),
       unique: true
    },
    _filename: {
        type: String,
        validate: {
            validator: (value) => {
                let regExp = /^.*\.(jpg|JPG|gif|GIF|doc|DOC|docx|DOCX|pdf|PDF|fb2|FB2|djvu|DJVU)$/;
                return (value != null && value.trim().length > 0) || regExp.test(value);
            },
            message: invalidExtension
        },
        unique: false
    },
    _url: String,
    _type: {
        type: String,
        enum: ['Photo', 'File']
    },
    _reference: {
        type: String,
        required: true
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

const AttachmentModel = mongoose.model('Attachment', AttachmentModelSchema);

module.exports = AttachmentModel;