const express = require('express');
const router = express.Router();
const {getUserOrders,updateOrderStatus} = require('../controllers/AdminController');
const {authMiddleware,isAdmin} = require('../middleware/authenticationMiddleware');
// const {check} = require('express-validator');

 

router.get('/admin/orders',authMiddleware,isAdmin,getUserOrders)
router.put('/admin/order-status',authMiddleware,isAdmin,updateOrderStatus)

module.exports = router;