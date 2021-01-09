const CartModel = require('../models/CartModel');
const CouponModel = require('../models/CouponModel')


exports.create= async(req,res) => {
  try {
      const coupon =  new CouponModel({
          name: req.body.name,
          expiry: req.body.expiry,
          discount: req.body.discount

      })
      await coupon.save()
      res.status(201).json(coupon);


  } catch (err) {
    
        res.status(400).json({status: 'Failed', message: err.message})//send the statusCode 400//the status: failed// and the exact message: err.message
    
  }
}
exports.list= async(req,res) => {
  try {
    const coupons = await CouponModel.find({}).sort({createdAt:-1})//sort in desc order//that is, the most recent first
    res.json(coupons)//json(post:post)
} catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
}

}


exports.remove= async(req,res) => {
  try {
        // const category = await Category.findOneAndDelete({slug: req.params.slug})
    //  res.json({message: `Category ${category.name} Removed`})
//or
    //  const category = await Category.findOneAndRemove({slug: req.params.slug})
    //  res.json({message: `Category ${category.name} Removed`})

//or
    const coupon = await CouponModel.findOne({_id: req.params.couponId}) //or
    if(coupon){
       await coupon.remove()//delete it//suppose the deleting is restricted to the person tht created it then we make sure the userid === user_id in category
       res.json({message: `Coupon ${coupon.name} Removed`})
    }else{
       res.status(404).json({message: 'Coupon Not Found'})
      //  throw new Error('category Not Found')
    }


    
} catch (err) {
    console.log(err.message)
    res.status(404).json({message: 'Server error'})
}
}


exports.applyCouponInCart= async(req,res) => {
  try {

    const coupon = await CouponModel.findOne({name: req.body.coupon}) //or
    if(!coupon){
     
       return res.json({err: `Invalid Coupon`})
    }else{//coupon is valid
      let {products, cartTotal} = await CartModel.findOne({orderedBy: req.user.id})
                                              .populate('products.product','_id title')//getting the main product info
    let totalAfterDiscount =( cartTotal - (cartTotal * coupon.discount / 100)).toFixed(2)
         let x = await CartModel.findOneAndUpdate({orderedBy:req.user.id},{totalAfterDiscount: totalAfterDiscount},{new: true})
         console.log(x.totalAfterDiscount)
          res.json(totalAfterDiscount )
        }


    
} catch (err) {
    console.log(err.message)
    res.status(404).json({message: 'Server error'})
}
}