const fs = require('fs')
const MIME_TYPES = {'image/png':'png','image/jpg':'jpg','image/jpeg':'jpeg',}
// ======================================================================
// original multer for user
// ======================================================================
const imageVal = (req,res,file,next) =>{
//validate req.file
    if(typeof(req.file) === 'undefined'){
       return res.status(400).json({error_message: "problems uploading image"})
    }
    console.log(req.file.path)
    if(!(req.file.mimetype).includes('jpg') && !(req.file.mimetype).includes('png') && !(req.file.mimetype).includes('jpeg')){
      
    fs.unlinkSync(req.file.path)
        return res.status(400).json({error_message: 'file not supported'})
    }
  
console.log(req.file.mimetype)
    next()
}


module.exports = imageVal;

