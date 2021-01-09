// const ProductModel = require('../models/ProductModel')
// const CartModel = require('../models/CartModel')
// const UserModel = require('../models/UserModel')
const OrderModel = require('../models/OrderModel')
// const { findOne } = require('../models/ProductModel')


exports.getUserOrders = async(req,res) => {
  try {
  const orders = await OrderModel.find({})
                                  .sort('-createdAt')
                                  .populate('products.product')//referencing the product in products array

    res.json(orders)
  } catch (err) {
      console.log(err.message)
  }
}

exports.updateOrderStatus = async(req,res) => {
  try {
    const {orderId, orderStatus} = req.body
  const update= await OrderModel.findByIdAndUpdate(orderId,{orderStatus: orderStatus},{new: true})
                                  

    res.json(update)
  } catch (err) {
      console.log(err.message)
  }
}
