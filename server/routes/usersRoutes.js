const express = require('express')
const router = express.Router();
const {getAllUsers} = require('../controllers/UserController')
const { check } = require('express-validator');
// const fileUpload = require('../middleware/file-upload')
const {authMiddleware,isAdmin,isReader} = require('../middleware/authenticationMiddleware')

//@route        GET api/users
//desc          Register User
//@access       Public
// router.post('/',
// [
//     fileUpload.single('photo'),
//    [ 
//     check('name','Please, add a name').not().isEmpty(),// body('name').not().isEmpty(),
//     check('email','Please, enter an email').not().isEmpty(),
//     check('email').normalizeEmail(),//convert Test@gmail.com to test@test.com
//     check('email','Please, enter a valid email').isEmail(),// body('email').isEmail(),
//     check('password','Please enter a password with 6 or more characters').isLength({ min: 6 })//body('password').isLength({ min: 5 })
//    ]
// ]
// , UserController.registerUsers) 

// ----------------------------------------------------------
// @route         GET  http://localhost:5000/api/auth/all-users
// @description   GET ALL USERS FOR REGISTRATION FRONTEND VALIDATION
// @access        PUBLIC by the authMiddleware
// router.get('/all-users', authMiddleware, isAdmin, getAllUsers)////if the user is authorizd, the request is going to have user from d authMiddleware(from d assignment req.user = decoded.user) that is ////request.user and request.user.id

module.exports = router;