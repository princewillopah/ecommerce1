const express = require('express')
const router = express.Router();
const ProductController = require('../../controllers/ProductController')
const { check} = require('express-validator');
const authMiddleware = require('../../middleware/authMiddleware');
//--------------------------------------------------------------------------
//@route        POST api/products/uploadImage
//desc          Create Product
//@access       Private
router.post('/uploadImage',[
authMiddleware,
    // [
    //     check('text','Text is required').not().isEmpty(),
    // ]
],
 ProductController.createProductImage)

// //-------------------------------------------------------------------------------------
//@route        POST api/products/uploadProduct
//desc          Create Product
//@access       Private
router.post('/uploadProduct',[
    authMiddleware,
        // [
        //     check('text','Text is required').not().isEmpty(),
        // ]
    ],
     ProductController.createProduct)
    

//  //-------------------------------------------------------------------------------------
//@route        GET api/products/all-products
//desc          get single post by id
//@access       Private
router.get('/all-products',authMiddleware, ProductController.getAllProducts)
    
// //-------------------------------------------------------------------------------------
// //@route        DELETE api/posts/id
// //desc          delete a post by owner
// //@access       Private
// router.delete('/:id',authMiddleware, PostsController.deletePost)
    
// //-------------------------------------------------------------------------------------
 
// //@route        DELETE api/posts/like/postid
// //desc          like a post only onces
// //@access       Private
// router.put('/like/:id',authMiddleware, PostsController.likePost)
    
// //-------------------------------------------------------------------------------------

// //@route        DELETE api/posts/unlike/postid
// //desc          unlike a post
// //@access       Private
// router.put('/unlike/:postid',authMiddleware, PostsController.unlikePost)
    
// //-------------------------------------------------------------------------------------
// //@route        POST api/posts/comment/post_id
// //desc          comment on a post
// //@access       Private
// router.post('/comment/:postId',[
//     authMiddleware,
//     [
//         check('text','Text is required').not().isEmpty(),
//     ]
// ],
// authMiddleware, PostsController.commentOnPost)
    
// //-------------------------------------------------------------------------------------

// //@route        DELETE api/posts/comment/postId/commentId
// //desc          delete a comment
// //@access       Private
// router.delete('/comment/:postId/:commentId',authMiddleware, PostsController.deleteComment)
    
//-------------------------------------------------------------------------------------
module.exports = router;