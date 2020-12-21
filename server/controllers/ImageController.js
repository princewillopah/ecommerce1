
const fs = require('fs')
const uuid = require('uuid')

exports.upload = async(req,res) => {
 
  try{

   //validate req.file
   if(typeof(req.files) === 'undefined'){
    return res.status(400).json({error_message: "problems uploading image"})
  }
// for(let i = 0; i < req.files; i++){
//   if(!(req.files[i].mimetype).includes('jpg') || !(req.files[i].mimetype).includes('png') || !(req.files[i].mimetype).includes('jpeg')){
   
//       fs.unlinkSync(req.files[i].path)//remove stored img
//           return res.status(400).json({error_message: 'file not supported'})//message
//       }
  
// }
//  if(!(req.files.mimetype).includes('jpg') && !(req.files.mimetype).includes('png') && !(req.files.mimetype).includes('jpeg')){
//  fs.unlinkSync(req.file.path)//remove stored img
//      return res.status(400).json({error_message: 'file not supported'})//message
//  }

//  if(req.file.size > 1024 * 1024 * 2){//if > 2mb
//   fs.unlinkSync(req.file.path)//remove stored img
//       return res.status(400).json({error_message: 'file should not be greater than 2mb'})//message
//   }
// const allpath = req.files.map(p=> p.path )
// const allpath = []
// for(let i = 0; i < req.files; i++){
//   allpath.unshift(i) //{public_id: uuid.v4()}, url: req.files[i]
// }
var result = req.files.map(img => ({ public_id: uuid.v4(), url: img.path}));
  res.json(result)
  }catch(err){
    console.log(err)
    res.json({error_message: err})
  }
  
  } 


exports.remove= (req,res,next) => {
let image_id = req.body.public_id
// res.json({image_id:'tyui'})
    res.json()
    console.log(res)
}