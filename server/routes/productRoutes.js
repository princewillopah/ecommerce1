const express = require('express');
const router = express.Router();
const {create,listAll,read,update,remove,list,totalProductCount,ratings,relatedProducts,searchProducts} = require('../controllers/ProductController');
const {authMiddleware,isAdmin} = require('../middleware/authenticationMiddleware');
const upload = require('../middleware/fileUpload2');
 

//for home page//we use post instead of get to request all product because of paramiters we wanna send with it//it is good for such purpose
router.post('/list',list)//https://localhost:500/api/products/list
router.get('/total-product-count',totalProductCount)//https://localhost:500/api/products/list
/////
//admin
router.post('/',authMiddleware,isAdmin,upload,create)//https://localhost:500/api/categories
router.get('/:count',listAll)//https://localhost:500/api/products/100 => list 1000 products
router.get('/product/:slug',read)//https://localhost:500/api/categories/slug
router.put('/:slug',authMiddleware,isAdmin,upload,update)//https://localhost:500/api/categories/slug
router.delete('/:slug',authMiddleware,isAdmin,remove)//https://localhost:500/api/categories/slug


//we use put because the person may wanna update it//here it is acting as create or update
router.put('/:productId/ratings',authMiddleware,ratings)//https://localhost:500/api/categories/slug

router.get('/:productId/related-products',relatedProducts)
//
//search 
router.post('/search/filters',searchProducts)


module.exports = router;