const ProductModel = require('../models/ProductModel')
const CartModel = require('../models/CartModel')
const UserModel = require('../models/UserModel')
const CouponModel = require('../models/CouponModel')
const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async(req,res) =>{
    try {
        //apply coupon

        //calculate price

        //get the user's cart total
        const {cartTotal,totalAfterDiscount} = await CartModel.findOne({orderedBy: req.user.id})
       
        let finalAmount = 0;
        if(req.body.couponApplied && totalAfterDiscount){
           finalAmount = Math.round(totalAfterDiscount * 100)
         
        }else{
            finalAmount = Math.round(cartTotal * 100)
        }
        console.log(req.body.couponApplied)
        console.log("cartTotal: ",cartTotal)
        console.log("totalAfterDiscount: ",totalAfterDiscount)
        console.log("payable: ",finalAmount)
        const paymentIntent = await stripe.paymentIntents.create({
            amount: finalAmount,//using the cartTotal//multiply be 100 because the cartTotal represent cent instead of dollar// 100cent = 1 dallar
            currency: "usd"
        })

        res.json({
            clientSecret: paymentIntent.client_secret,
             cartTotal: cartTotal,
             totalAfterDiscount: totalAfterDiscount,
             payable: finalAmount
        })
        // res.send(paymentIntent.client_secret)

    } catch (error) {
        
    }


}