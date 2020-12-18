const Category = require('../models/CategoryModel')
const Sub = require('../models/SubCategoryModel')
const slugify = require('slugify')

exports.create= async(req,res,next) => {
  try {
      const category =  new Category({
          name: req.body.name,
          slug: slugify(req.body.name)
      })
      await category.save()
      res.status(201).json({ status:'success', category: category});


  } catch (err) {
    if(err.code === 11000){
        const categoryname = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]//match(/(["'])(\\?.)*?\1/)[0] get the chtching the tourname and getting the first one
        res.status(400).json({status: 'Failed', message: `Duplicated Category Name: ${categoryname}. please use another Name `})
    }else{
        res.status(400).json({status: 'Failed', message: err.message})//send the statusCode 400//the status: failed// and the exact message: err.message
    }
  }
}
exports.list= async(req,res,next) => {
  try {
    const categories = await Category.find().sort({createdAt:-1})//sort in desc order//that is, the most recent first
    res.json(categories)//json(post:post)
} catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
}

}
exports.read= async(req,res,next) => {
  try {
    const category = await Category.findOne({slug: req.params.slug})//because this route has been screened by the authmiddleware, res.category now has access to the logged in category in(from the authmiddleware)
   //if category exist
   if(category){
       res.status(200).json(category)
   }else{
       return res.status(404).json({message: 'Category Not Found'})
   }
   
 } catch (err) {  
 console.error(err.message)
 res.status(400).json({status: 'Failed', message: err.message})
}
}
exports.update= async(req,res,next) => {
      

      try {

        //  const category = await Category.findOneAndUpdate({slug: req.params.slug},{name: req.body.name,slug: slugify(req.body.name)},{new: true})
      //  if(!category){//if no tour of suct id
      //   return res.status(404).json({status: 'Failed', message: 'No Such Category'})
      // }
      //  res.json(category)
            //or
        const category = await  Category.findOne({slug: req.params.slug})
        if(category){
          category.name = req.body.name || category.name
          category.slug = slugify(req.body.name) || category.slug

            await category.save()
            res.status(201).json(category)
       
        }else{
          return res.status(404).json({status: 'Failed', message: 'No Such Category'})
        }
    }catch(err){
      console.error(err.message)
      res.status(400).json({status: 'Failed', message: err.message})
    }
}

exports.remove= async(req,res,next) => {
  try {
        // const category = await Category.findOneAndDelete({slug: req.params.slug})
    //  res.json({message: `Category ${category.name} Removed`})
//or
    //  const category = await Category.findOneAndRemove({slug: req.params.slug})
    //  res.json({message: `Category ${category.name} Removed`})

//or
    const category = await Category.findOne({slug: req.params.slug}) //or
    if(category){
       await category.remove()//delete it//suppose the deleting is restricted to the person tht created it then we make sure the userid === user_id in category
       res.json({message: `Category ${category.name} Removed`})
    }else{
       res.status(404).json({message: 'Category Not Found'})
      //  throw new Error('category Not Found')
    }


    
} catch (err) {
    console.log(err.message)
}
}

exports.getSubsCatId= async(req,res,next) => {
  try {
  
    const subcategories = await Sub.find({parent: req.params.id}) //or
    if(subcategories){ 
      res.status(200).json(subcategories)
    }else{
       res.status(404).json({message: 'SubCategory Not Found'})
     
    }
    
} catch (err) {
    console.log(err.message)
}
}