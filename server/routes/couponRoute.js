const express = require('express');
const router = express.Router();
const {create,list,remove,applyCouponInCart} = require('../controllers/CouponController');
const {authMiddleware,isAdmin} = require('../middleware/authenticationMiddleware');
 

router.post('/coupon',authMiddleware,isAdmin,create)//https://localhost:500/api/categories
router.get('/coupons',list)//https://localhost:500/api/categories
router.post('/coupon/apply-coupon-in-cart',authMiddleware,applyCouponInCart)
router.delete('/coupon/:couponId',authMiddleware,isAdmin,remove)


module.exports = router;