const Product = require('../models/ProductModel')
const UserModel = require('../models/UserModel')
const slugify = require('slugify')
// const uuid = require('uuid')
const fs = require('fs')
const { findOneAndUpdate } = require('../models/ProductModel')

// ===================================================================================
// home page
// ====================================================================================
exports.create= async(req,res,next) => {

  try {
    const reqFiles = [];
    const url = req.protocol + '://' + req.get('host')
    for (var i = 0; i < req.files.length; i++) {
        reqFiles.push(url + '/uploads/products/' + req.files[i].filename)
    }
    // req.body.slug = slugify(req.body.title)
    // req.files = req.files.map(img => ({ public_id: uuid.v4(), url: img.path}))
    //   const product =  new Product(req.body)
   
      // const product = await Product.create(req.body) 
      // res.status(201).json({ status:'success', product: product});

      const product =  new Product({
        title: req.body.title,
        slug: slugify(req.body.title),//the logged in user creating this product
        description: req.body.description || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eius eaque illum autem, vero, consectetur error iure corporis incidunt, optio sit? Molestias blanditiis ullam dolor possimus omnis fugiat harum quis?',
        price: req.body.price || 0,
        quantity: req.body.quantity || 0,
        sold: req.body.sold || 0,
        shipping:  req.body.shipping || "Yes",
        color:  req.body.color || "Green",
        brand:  req.body.brand || "Apple",
        images: reqFiles,
        // images: req.files.map(img => ({ public_id: uuid.v4(), url: img.path})),
        category: req.body.category, 
        subCategory: req.body.subCategory,
      })
      await product.save()
      res.status(201).json({ status:'success', product: product});
  } catch (err) {
    if(err.code === 11000){
        const productname = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]//match(/(["'])(\\?.)*?\1/)[0] get the chtching the tourname and getting the first one
        res.status(400).json({status: 'Failed', message: `Duplicated product Name: ${productname}. please use another Name `})
    }else{
        res.status(400).json({status: 'Failed', message: err.message})//send the statusCode 400//the status: failed// and the exact message: err.message
    }
  }
}

exports.listAll= async(req,res) => {
  try {
    const products = await Product.find({})
                                   .limit(parseInt(req.params.count))
                                   .populate("category")
                                   .populate("subCategory")
                                   .sort([["createdAt","desc"]])
                                   .exec()//uneccessary
                                  //  .sort({createdAt:-1})//sort in desc order//that is, the most recent first
    
       res.json(products)//json(post:post)
} catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
}

}

exports.read= async(req,res,next) => {
  try {
    const product = await Product.findOne({slug: req.params.slug})
    .populate('category').populate('subCategory')
   //if product exist
   if(product){
       res.status(200).json(product)
   }else{
       return res.status(404).json({message: 'product Not Found'})
   }
   
 } catch (err) {  
 console.error(err.message)
 res.status(400).json({status: 'Failed', message: err.message})
}
}
exports.update= async(req,res,next) => {
      
//   if (!req.files) {
//     return next(new ErrorResponse(`Please upload a file`, 400))
// }

// const file = req.files.file;

// // Confirm the image is a photo
// if (!file.mimetype.startsWith('image')) {
//     return next(new ErrorResponse(`Please upload an image file`, 400))
// }

// // Check File Size
// if (file.size > process.env.MAX_FILE_UPLOAD) {
//     return next(
//         new ErrorResponse(`Please upload an image less than ${ MAX_FILE_UPLOAD }`, 400)
//     )
// }
      try {
        const reqFiles = [];
        if(req.files.length > 0){
          const url = req.protocol + '://' + req.get('host')
          for (var i = 0; i < req.files.length; i++) {
              reqFiles.push(url + '/uploads/products/' + req.files[i].filename)
          }
        }


        const prodUpdate = await  Product.findOne({slug: req.params.slug})
        console.log('b4: ',prodUpdate.category)
        if(prodUpdate){
          prodUpdate.title = req.body.title || prodUpdate.title
          prodUpdate.slug = slugify(req.body.title) || prodUpdate.slug
          prodUpdate.description = req.body.description ||  prodUpdate.description
          prodUpdate.price = req.body.price || prodUpdate.price
          prodUpdate.quantity = req.body.quantity || prodUpdate.quantity
          prodUpdate.sold = req.body.sold || prodUpdate.sold
          prodUpdate.shipping =  req.body.shipping || prodUpdate.shipping
          prodUpdate.color =  req.body.color || prodUpdate.color
          prodUpdate.brand =  req.body.brand || prodUpdate.brand
          prodUpdate.images = reqFiles.length > 0 && reqFiles || prodUpdate.images
          // images = req.files.map(img => ({ public_id = uuid.v4() url = img.path}))
          prodUpdate.category = req.body.category || prodUpdate.category
          prodUpdate.subCategory = req.body.subCategory || prodUpdate.subCategory

            await prodUpdate.save()
            res.status(201).json(prodUpdate)
            // console.log('after: ',previousImgHolder)
            console.log('after: ',prodUpdate.category)
        }else{
          return res.status(404).json({status: 'Failed', message: 'No Such product'})
        }
        
        // const prodUpdated = await  Product.findOneAndUpdate({slug: req.params.slug})
       

    }catch(err){
      console.error(err.message)
      res.status(400).json({status: 'Failed', message: err.message})
    }
}

exports.remove= async(req,res,next) => {
  try {
   
    
  //  const deleted = await Product.findByIdAndRemove({slug: req.params.slug})
  //  res.json(deleted)
  const product = await Product.findOne({slug: req.params.slug}) //or
  if(req.files){//if there is a file in tis request/ delete it since this request will not go through
    fs.unlinkSync(req.files,(err)=>{console.log(err)})
   }
  if(product){
    console.log(req.files)
     await product.remove()//delete it//suppose the deleting is restricted to the person tht created it then we make sure the userid === user_id in category
     res.json({message: `Product  "${product.title}" Removed`})
  }else{
     res.status(404).json({message: 'product Not Found'})
    //  throw new Error('category Not Found')
  }

  } catch (err) {
      console.log(err.message)
  }
}
// ===================================================================================
// home page
// ====================================================================================
// exports.list= async(req,res) => {
//   try {
//     const products = await Product.find({})
//                                    .limit(req.body.limit)
//                                    .populate("category")
//                                    .populate("subCategory")
//                                    .sort([[req.body.sort,req.body.order]])//sort=createdAt,order=desc
//                                    .exec()//uneccessary
//                                   //  .sort({createdAt:-1})//sort in desc order//that is, the most recent first
    
//        res.json(products)//json(post:post)
// } catch (err) {
//     console.error(err.message)
//     res.status(500).send('Server Error')
// }

// }

exports.list= async(req,res) => {
  const currentPage = req.body.page || 1;//page number//this is the pagination number
  const productPerPage = 6;//amount of product that should be returned per request
  const AmtOfproductToSkip = (currentPage - 1) * productPerPage;
//based on (currentPage - 1) * productPerPage;
//if page=1 or currentPage = 1 then AmtOfproductToSkip=(1-1)*6 = 0//meaning no product will be skipped at page 1
//if page=2 or currentPage = 2 then AmtOfproductToSkip=(2-1)*6 = 6//meaning the first six products in the DB will be skipped at page 2
//if page=3 or currentPage = 3 then AmtOfproductToSkip=(3-1)*6 = 12//meaning the first 12 products in the DB will be skipped at page 3
//if page=4 or currentPage = 4 then AmtOfproductToSkip=(4-1)*6 = 18//meaning the first 18 product in the DB will be skipped at page 4

try {
    const products = await Product.find({})
                                    .skip(AmtOfproductToSkip)//amount of product to skip based on currentPage
                                   .limit(productPerPage)//AMOUNT OF PRODUCT TO SEND BASE ON REQUEST
                                   .populate("category")
                                   .populate("subCategory")
                                   .sort([[req.body.sort,req.body.order]])//sort=createdAt,order=desc
                                   .exec()//uneccessary
                                  //  .sort({createdAt:-1})//sort in desc order//that is, the most recent first
    
       res.json(products)//json(post:post)
} catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
}

}

exports.totalProductCount = async(req,res) => {
  try {
    const total = await Product.find({}).estimatedDocumentCount()//count the number of products
                                  //  .exec()//uneccessary
                                  //  .sort({createdAt:-1})//sort in desc order//that is, the most recent first
    
       res.json(total)//json(post:post)
} catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
}

}

exports.ratings = async(req,res) => {
  // console.table(req.body);
  // console.table(req.params);
  // console.log('user: ',req.user.id);
  
  try {
  const {star} = req.body
  const user = await UserModel.findOne({_id: req.user.id})//get the authenticated user

  const product = await Product.findById(req.params.productId)//get the product whose id is provided

  let existingRating =  product.ratings.find(rate => rate.postedBy.toString() === user._id.toString())

  if(existingRating === undefined){//if this user has not rated this product
    let ratingAdded = await Product.findByIdAndUpdate(product._id,{ $push: {ratings:{star, postedBy: user._id}}},{new:true})
    res.json(ratingAdded)

  }else{
      //update
      const ratingUpdated = await Product.updateOne({ratings: {$elemMatch: existingRating}},{$set: {"ratings.$.star": star}},{new:true}).exec()//update the profile
      // const ratingUpdated = await Product.findOneAndUpdate({ratings: {_id: existingRating._id}},{$set: {"ratings.$.star": star}},{new:true}).exec()//update the profile
      res.json(ratingUpdated)//return the profile u just updated
  }

  } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
  }

}


exports.relatedProducts = async(req,res) => {
  try {
const product = await Product.findById(req.params.productId)
    const relatedProducts = await Product.find({
                              _id: {$ne: product._id},//get all product, exclude the one whose id is passed in here
                              category: product.category, //filter only those whose category are as the same as the one passed
                            })
                              .limit(3)//AMOUNT OF PRODUCT TO SEND BASE ON REQUEST
                              .populate("category")
                              .populate("subCategory")


res.json(relatedProducts)//json(post:post)
  } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
  }

}