const express = require('express');
const router = express.Router();
const {createPaymentIntent} = require('../controllers/StripeController');
const {authMiddleware} = require('../middleware/authenticationMiddleware');

 

//for home page//we use post instead of get to request all product because of paramiters we wanna send with it//it is good for such purpose
// router.post('/list',list)//https://localhost:500/api/products/list
router.post('/create-payment-intent',authMiddleware,createPaymentIntent)//https://localhost:500/api/products/list




module.exports = router;