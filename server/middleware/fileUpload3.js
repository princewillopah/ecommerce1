const multer = require('multer')
const path = require('path');//to extract parts of string
// ======================================================================
//  multer middleware
// ======================================================================
// set storage: flename and file destination
const MIME_TYPES = {'image/png':'png','image/jpg':'jpg','image/jpeg':'jpeg',}

var storage = multer.diskStorage({
    //file destination folder
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },//then file name
    filename: function (req, file, cb) {
    // console.log(file)
    const ext = MIME_TYPES[file.mimetype];//get the extenson
    const myfilename = path.parse(file.originalname).name//get just the name, remove the .extention
            
    cb(null,'product'+'_'+Date.now()+'_'+myfilename+'.'+ext)//like product_34567845_image.jpg
    },
  })
//file filter: we accept any file because we will do the validation later
const filerFilter = (req,file,cb) =>{
    cb(null, true)
}//
//       fileFilter: (req,res,file,cb) => {
//       const ext = path.extname(file.originalname)//get the extention
//       if(ext !=='jpg' || ext !== 'jpeg' || ext !== 'png'){return cb(res.status(400).end('Only jpeg,jpg, and png are allowed'),false)}
//       cb(null,true)
//   }
  

// let upload = multer({
//     storage:storage,
//     fileFilter: filerFilter
// }).array('images',12)
var upload = multer({
  storage:storage,
  fileFilter: filerFilter
}).array('images',12)



module.exports = upload;