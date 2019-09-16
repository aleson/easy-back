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
                let regExp = /\.[0-9a-z]{1,5}[doc, docx, pdf,fb2]$/;
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

module.exports = AttachmentModel;