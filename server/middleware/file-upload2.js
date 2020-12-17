const multer = require('multer')
const path = require('path');//to extract parts of string

// ======================================================================
// multer config 2
// ======================================================================

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/products')
    },
    filename: function (req, file, cb) {
        // const ext = MIME_TYPES[file.mimetype];//get the type of file
        const myfilename = path.parse(file.originalname).name//get just the name, remove the .extention
      cb(null, `${myfilename}_${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req,res,file,cb) => {
      const ext = path.extname(file.originalname)//get the extention
      if(ext !=='jpg' || ext !== 'jpeg' || ext !== 'png'){return cb(res.status(400).end('Only jpeg,jpg, and png are allowed'),false)}
      cb(null,true)
  }
  })

var upload = multer({storage:storage}).single('fileFormFrontend')




module.exports = upload;
// exports.upload = upload;
// exports.userfileUpload = userfileUpload;
