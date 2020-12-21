const express = require('express');
const router = express.Router();
const {upload,remove} = require('../controllers/ImageController');
const {authMiddleware,isAdmin} = require('../middleware/authenticationMiddleware');
const uploadMulter = require('../middleware/fileUpload2');
// const imageValidation = require('../middleware/imageValidation')

// router.post('/uploadimage',authMiddleware,isAdmin,uploadMulter,upload)//https://localhost:500/api/categories
// router.post('/removeimage',authMiddleware,isAdmin,uploadMulter,remove)//https://localhost:500/api/sub-categories/cat/id  get all subs with this cat id
// router.post('/uploadimage',upload)//https://localhost:500/api/categories
router.post('/uploadimage',uploadMulter,upload)
router.post('/removeimage',uploadMulter,remove)//https://localhost:500/api/sub-categories/cat/id  get all subs with this cat id

module.exports = router; 