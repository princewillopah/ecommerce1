const ProductModel = require('../models/ProductModel')
const CartModel = require('../models/CartModel')
const UserModel = require('../models/UserModel')
const OrderModel = require('../models/OrderModel')
// const uniqueid = require('uniqueid')
const uuid = require('uuid')


exports.userCart= async(req,res) => {
    try {
    
    const {cart} = req.body//extract the cart sent from frontend
    //the idea is not create a new products and save it in the cart database because the product in frontend is a 
    //little different from backend//in fronend, products has additional field "count", and mordified "color" etc

    let products = []//the new products(the first property in CartModel) to be stored in user cartModel

    //every user must have only one cart//they may have multiple orders
    const user = await UserModel.findOne({_id: req.user.id})
  //check if a cart beloging to d logged-in user already exist, if true, then remove so we can start afresh
    const cartExistByThisUser = await CartModel.findOne({orderedBy: user._id})
    if(cartExistByThisUser){//IF TRUE
      cartExistByThisUser.remove()  
    }
    //now we create new fresh products objects based on cart from front end so that they can look like the cart model
    //after creating this objects of project, we push them into the products array up there
    for(let i = 0; i < cart.length; i++){
      let object = {}//  the object rapper to carry those products in CartModel format

      object.product = cart[i]._id//the id in cart(from frontend) to be stored in {product} as it is in cartModel
      object.count = cart[i].count
      object.color = cart[i].color
      //we need to get the original price of this product from db so as to be consistent with what the fromend sends encase hackers manipulated the values from frontend
      let {price} = await ProductModel.findById(cart[i]._id).select('price')
      object.price = price//we extracted/distructured the price from the product gotten from Product
      products.push(object)//pust to product array//this is going to be the first property in cart as specified by CartModel
    }
    //now lets calculate the cartTotal in CartModel
    let cartTotal = 0;
    for(let i = 0; i < products.length; i++){
      cartTotal = cartTotal + (products[i].price * products[i].count)//multiple the price*count and add to cartTotal on each iteration
    }
    //now lets create the cart for this user
    let newCart = await new CartModel({
      products: products,
      cartTotal: cartTotal,
      orderedBy: user._id
    }).save()
    // console.log("new cart: ",newCart)
    res.json({ok: true})//this is what we send to fronend// it is recieved as res.data.ok = true 

  } catch (err) {
      console.log(err.message)
  }
}

exports.getUserCart= async(req,res) => {
  try {
  let cart = await CartModel.findOne({orderedBy: req.user.id})//cart based on logged in user
                            .populate("products.product","_id title") //populate original product

  const {cartTotal, products,totalAfterDiscount} = cart

  res.json({cartTotal, products,totalAfterDiscount})
} catch (err) {
    console.log(err.message)
}
}
exports.removeUserCart= async(req,res) => {
  try {
  await CartModel.findOneAndRemove({orderedBy: req.user.id})//cart based on logged in user
    
  res.json({message: 'Cart has been emptied'})
} catch (err) {
    console.log(err.message)
}
}
exports.userAddress = async(req,res) => {
  try {
    // console.table(req.body)
    // req.body.address = "opah places"
  const userAdress = await UserModel.findOneAndUpdate({_id: req.user.id},{address: 'love'})//cart based on logged in user
  // const userAdress = await UserModel.findById( req.user.id)
  res.json({ok:true})
  // res.json(userAdress)
} catch (err) {
    console.log(err.message)
}
}

exports.creatUserOrders = async(req,res) => {
    try {
     //request from stripe
     const {paymentIntent} = req.body.stripeResponse
      //get the products from the user's cart
      const {products} = await CartModel.findOne({orderedBy: req.user.id})
      //create the order in orderModel
      let newOrder = await new OrderModel({
        products,
        paymentIntent,
        orderedBy: req.user.id
      }).save()
      //reduce quantity and increase sold in product collection(table)
  let bulkOption = products.map((item)=>{//this is the array the bulkwrite is gonna act on
    return {
      updateOne: {
        filter: {_id: item.product._id},//only those products sold
        update: {$inc: {quantity: -item.count, sold: +item.count}}
       }
    }
  }
  )
  let update = await ProductModel.bulkWrite(bulkOption,{new: true})

      res.json({ok:true})
      // res.json(userAdress)
    } catch (err) {
        console.log(err.message)
    }
}

exports.creatUserCashOrders = async(req,res) => {
  try {
    const {COD,couponApplied} =req.body
    //if COD is true, create order with status of Cash On Delivery
    if(!COD) return res.json('Create Cash On Delivery Failed')
    //get the user CART
    const userCart = await CartModel.findOne({orderedBy: req.user.id})
    //
    let finalAmount = 0;
    if(couponApplied && userCart.totalAfterDiscount){
       finalAmount = Math.round(userCart.totalAfterDiscount * 100)
     
    }else{
        finalAmount = Math.round(userCart.cartTotal * 100)
    }
    //create the order in orderModel
    let newOrder = await new OrderModel({
      products: userCart.products,
      paymentIntent: {
       id: uuid.v4(),
       amount: finalAmount,
       currency:'Naira',
       status: 'Cash On Delivery',
       created: Date.now(),
      payment_method_type: ['cash','POS','Transfer']
      },
      orderedBy: req.user.id,
      orderStatus: 'Cash On Delivery'
    }).save()
    //reduce quantity and increase sold in product collection(table)
let bulkOption = userCart.products.map((item)=>{//this is the array the bulkwrite is gonna act on
  return {
    updateOne: {
      filter: {_id: item.product._id},//only those products sold
      update: {$inc: {quantity: -item.count, sold: +item.count}}
     }
  }
}
)
let update = await ProductModel.bulkWrite(bulkOption,{new: true})

    res.json({ok:true})
    // res.json(userAdress)
  } catch (err) {
      console.log(err.message)
  }
}

exports.getUserOrders = async(req,res) => {
  try {
    // console.table(req.body)
    // req.body.address = "opah places"
  const orders = await OrderModel.find({orderedBy: req.user.id}).populate('products.product')//referencing the product in products array
  // const userAdress = await UserModel.findById( req.user.id)
    res.json(orders)
    // res.json(userAdress)
  } catch (err) {
      console.log(err.message)
  }
}

// --------------wishlist-----------------------------------
exports.addToWishList  = async(req,res) => {
  try {
  const user = await UserModel.findOneAndUpdate(
    {_id: req.user.id},//get the auth user
    {$addToSet: {wishlist: req.body.productId}}, //$addToSet makes sure data is not repeted in  this wishlist
    )
    res.json({OK: true})
  } catch (err) {
      console.log(err.message)
  }
}

exports.wishList  = async(req,res) => {
  try {
  const list = await UserModel.findById(req.user.id)//from the users, get the one with this id
                          .select('wishlist')// i am only interested on the property"wishlist" not name or email etc
                          .populate('wishlist')//this only has ids of product//but i need the products itself//since the "wishlist" ref Pproduct" it will populate them//so populate them 
    res.json(list)//will go to frontend as res.data.wishlist since 'wishlist is the property we re interested in
    // res.json(userAdress)
  } catch (err) {
      console.log(err.message)
  }
}

exports.removeFromWishList  = async(req,res) => {
  try {
    const user = await UserModel.findOneAndUpdate(
      {_id: req.user.id},//get the auth user
      {$pull: {wishlist: req.params.productId}}, //$pull removes a product from the wishlist
      )
      res.json({OK: true})
  } catch (err) {
      console.log(err.message)
  }
}
