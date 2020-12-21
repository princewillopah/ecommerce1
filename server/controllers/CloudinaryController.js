const cloudinary = require('cloudinary')
// const Sub = require('../models/SubCategoryModel')
// const slugify = require('slugify')


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_Key,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.upload= async(req,res) => {
   let result = await cloudinary.uploader.upload(req.body.image,{public_id: `${Date.now}`,  resource_type: "auto"} )
  res.json({public_id: result.public_id, url: result.secure_url})
  } 
// exports.upload= async(req,res) => {

//  res.json({public_id: result.public_id, url: result.secure_url})
//  } 
// exports.upload= async(req,res) => {
//      let result = await cloudinary.uploader.upload('',{public_id: `${Date.now}`,  resource_type: "auto"} )
// //   
// res.json({public_id: result.public_id, url: result.secure_url})
//  }
//   {width: 1280, height: 720, crop: "limit"}


exports.remove= (req,res,next) => {
let image_id = req.body.public_id
cloudinary.uploader.destroy(image_id, (err,result)=>{
  if(err) return res.json({success: false, error: err})
  res.send('ok')
});

}