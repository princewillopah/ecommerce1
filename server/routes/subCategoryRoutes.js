const express = require('express');
const router = express.Router();
const {create,list,read,update,remove} = require('../controllers/SubCategoryController');
const {authMiddleware,isAdmin} = require('../middleware/authenticationMiddleware');
 

router.post('/',authMiddleware,isAdmin,create)//https://localhost:500/api/sub-categories
router.get('/',list)//https://localhost:500/api/sub-categories
router.get('/:slug',read)//https://localhost:500/api/sub-categories/slug
router.put('/:slug',authMiddleware,isAdmin,update)//https://localhost:500/api/sub-categories/slug
router.delete('/:slug',authMiddleware,isAdmin,remove)//https://localhost:500/api/sub-categories/slug





module.exports = router;