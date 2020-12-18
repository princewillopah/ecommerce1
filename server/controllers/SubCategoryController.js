const Sub = require('../models/SubCategoryModel')
const slugify = require('slugify')

exports.create= async(req,res,next) => {
  try {
      const subcategory =  new Sub({
          name: req.body.name,
          parent: req.body.parent,
          slug: slugify(req.body.name)
      })
      await subcategory.save()
      res.status(201).json({ status:'success', subcategory: subcategory});
  } catch (err) {
    // if(err.code === 11000){
    //     const subcategoryname = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]//match(/(["'])(\\?.)*?\1/)[0] get the chtching the tourname and getting the first one
    //     res.status(400).json({status: 'Failed', message: `Duplicated SubCategory Name: ${subcategoryname}. please use another Name `})
    // }else{
    //     res.status(400).json({status: 'Failed', message: err.message})//send the statusCode 400//the status: failed// and the exact message: err.message
    // }

    res.status(400).json({status: 'Failed', message: err.message})
  }
}

exports.list= async(req,res,next) => {
  try {
    const subcategories = await Sub.find().sort({createdAt:-1})//sort in desc order//that is, the most recent first
    res.json(subcategories)//json(post:post)
} catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
}

}
exports.read= async(req,res,next) => {
  try {
    const subcategory = await Sub.findOne({slug: req.params.slug})//because this route has been screened by the authmiddleware, res.category now has access to the logged in category in(from the authmiddleware)
   //if category exist
   if(subcategory){
       res.status(200).json(subcategory)
   }else{
       return res.status(404).json({message: 'SubCategory Not Found'})
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
        const subcategory = await  Sub.findOne({slug: req.params.slug})
        if(subcategory){
          subcategory.name = req.body.name || subcategory.name
          subcategory.parent = req.body.parent || subcategory.parent
          subcategory.slug = slugify(req.body.name) || subcategory.slug

            await subcategory.save()
            res.status(201).json(subcategory)
       
        }else{
          return res.status(404).json({status: 'Failed', message: 'No Such SubCategory'})
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
    const subcategory = await Sub.findOne({slug: req.params.slug}) //or
    if(subcategory){
       await subcategory.remove()//delete it//suppose the deleting is restricted to the person tht created it then we make sure the userid === user_id in category
       res.json({message: `Category ${subcategory.name} Removed`})
    }else{
       res.status(404).json({message: 'SubCategory Not Found'})
      //  throw new Error('category Not Found')
    }


    
} catch (err) {
    console.log(err.message)
}
}



