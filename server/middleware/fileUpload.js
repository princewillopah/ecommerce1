const multer = require('multer')
const path = require('path');//to extract parts of string
// const uuid = require('uuid')
const MIME_TYPES = {'image/png':'png','image/jpg':'jpg','image/jpeg':'jpeg',}
// ======================================================================
// original multer for user
// ======================================================================
const fileUpload = multer({
    limits:50000,
    storage:multer.diskStorage({
        destination:(req,file,cb)=>{cb(null,'./uploads')},//location
        filename:(req,file,cb)=>{
            const ext = MIME_TYPES[file.mimetype];//get the type of file
            // cb(null,Date.now()+'.'+ext)//creating the name
            const myfilename = path.parse(file.originalname).name//get just the name, remove the .extention
            cb(null,myfilename+'_'+Date.now()+'_'+  Math.round(Math.random() * 1E9)+'.'+ext)//creating the nam
        }
    }), 
    fileFilter: (req,file,cb)=>{//validate
        const isValid = !!MIME_TYPES[file.mimetype]//isValid retures true or false based on the extention MIME_TYPES[file.mimetype]
        const error = isValid?null:new Error('invalid file type. only jpg,png or jpeg are required')
        cb(error,isValid)
    }

}).array('images')


module.exports = fileUpload;

