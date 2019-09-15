const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('media/file');
        cb(null, 'media/file');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    }
});

exports.upload = multer({storage: storage});

