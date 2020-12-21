const express = require('express');
const router = express.Router();
const {upload,remove} = require('../controllers/CloudinaryController');
const {authMiddleware,isAdmin} = require('../middleware/authenticationMiddleware');
 
  

router.post('/uploadimage',authMiddleware,isAdmin,upload)//https://localhost:500/api/categories
router.post('/removeimage',authMiddleware,isAdmin,remove)//https://localhost:500/api/sub-categories/cat/id  get all subs with this cat id

module.exports = router;