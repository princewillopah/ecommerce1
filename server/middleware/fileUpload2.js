const multer = require('multer')
const path = require('path');//to extract parts of string

// ======================================================================
// multer config 2
// ======================================================================

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/products')
    },
    filename: function (req, file, cb) {
        // const ext = MIME_TYPES[file.mimetype];//get the type of file
        const myfilename = path.parse(file.originalname).name//get just the name, remove the .extention
      cb(null, `${myfilename}_${Date.now()}_${file.originalname}`)
    },

  })

  const filerFilter = (req,file,cb) => {
      cb(null, true);                   
 }
var upload = multer({storage:storage,fileFilter:filerFilter}).array('images',12)
// var upload = multer({storage:storage,fileFilter:filerFilter}).single('images')



module.exports = upload; 
// exports.upload = upload;
// exports.userfileUpload = userfileUpload;
