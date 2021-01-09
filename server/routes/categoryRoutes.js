const express = require('express');
const router = express.Router();
const {create,list,read,update,remove,getSubsCatId,categoriesBasedProducts} = require('../controllers/CategoryController');
const {authMiddleware,isAdmin} = require('../middleware/authenticationMiddleware');
 

router.post('/',authMiddleware,isAdmin,create)//https://localhost:500/api/categories
router.get('/',list)//https://localhost:500/api/categories
router.get('/:slug',read)//https://localhost:500/api/categories/slug
router.put('/:slug',authMiddleware,isAdmin,update)//https://localhost:500/api/categories/slug
router.delete('/:slug',authMiddleware,isAdmin,remove)//https://localhost:500/api/categories/slug
router.get('/:id/sub-categories',getSubsCatId)//https://localhost:500/api/sub-categories/cat/id  get all subs with this cat id

router.get('/:slug/products',categoriesBasedProducts)

module.exports = router;