const express = require('express');
const router = express.Router();
const {logUser,register,forgetPassword,resetPassword,updatePassword} = require('../controllers/AuthController');
const {authMiddleware,isAdmin} = require('../middleware/authenticationMiddleware');
// const {check} = require('express-validator');


// @route         GET  http://localhost:5000/api/auth
// @description   GET LOGGED IN USER
// @access        PRIVATE/PROECTED by the authMiddleware
// router.get('/', authMiddleware, AuthController.getAuth)////if the user is authorizd, the request is going to have user from d authMiddleware(from d assignment req.user = decoded.user) that is ////request.user and request.user.id
// router.get('/', getAllUsers)////if the user is authorizd, the request is going to have user from d authMiddleware(from d assignment req.user = decoded.user) that is ////request.user and request.user.id

// @route         POST http://localhost:5000/api/login
// @description   authenticate/login user and get token
// @access        public   

router.post('/login',logUser)
router.post('/register', register)
router.post('/forgetPassword', forgetPassword)
router.patch('/reset-password', resetPassword)
router.patch('/update-password',authMiddleware, updatePassword)//auth

router.patch('/current-admin',authMiddleware,isAdmin,updatePassword)//auth





module.exports = router;