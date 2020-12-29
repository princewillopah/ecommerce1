const multer = require('multer')
const path = require('path');//to extract parts of string
const uuid = require('uuid')
// const uuid = require('uuid')
const MIME_TYPES = {'image/png':'png','image/jpg':'jpg','image/jpeg':'jpeg',}
// ======================================================================
// original multer for user
// ======================================================================
const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuid.v4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});




module.exports = upload;

