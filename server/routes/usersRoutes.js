const express = require('express');
const router = express.Router();
const {userCart,getUserCart,removeUserCart,userAddress,creatUserOrders,getUserOrders,addToWishList,wishList,removeFromWishList} = require('../controllers/UserController');
const {authMiddleware} = require('../middleware/authenticationMiddleware');
// const {check} = require('express-validator');

 

// router.post('/login',logUser)
// router.post('/register', register)
// router.post('/forgetPassword', forgetPassword)
// router.patch('/reset-password', resetPassword)
// router.patch('/update-password',authMiddleware, updatePassword)//auth

// router.patch('/current-admin',authMiddleware,isAdmin,updatePassword)//auth

router.post('/user/cart',authMiddleware,userCart)//responsible for recreating a cart by a user sent from frontend
router.get('/user/cart',authMiddleware,getUserCart)//responsible for creating a cart by a user
router.delete('/user/cart',authMiddleware,removeUserCart)//responsible for creating a cart by a user
router.post('/user/address',authMiddleware,userAddress)
router.post('/user/create-order',authMiddleware,creatUserOrders)
router.get('/user/orders',authMiddleware,getUserOrders)

router.post('/user/wishlist',authMiddleware,addToWishList)
router.get('/user/wishlist',authMiddleware,wishList)
router.put('/user/wishlist/:productId',authMiddleware,removeFromWishList)

module.exports = router;