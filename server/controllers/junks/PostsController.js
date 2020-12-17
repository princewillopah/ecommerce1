const Profile = require('../models/Profile');
const User = require('../../models/User.js')
const Post = require('../models/Post')
// const config = require('config')
const { validationResult } = require('express-validator');
// ====================================================================
//      CREATING Post
// ========================================================================
const createPosts = async(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select('-password')
        //create post object
        const newPost = {
            text:req.body.text,//from form
            name:user.name,//from user
            avatar:user.photo,//from user
            user:req.user.id//from middleware
        }
        const post = await new Post(newPost)//create the post
        await post.save()//save post
        //both lines can be achieved with//'const post = await newPost(newPost)'
        res.json(post)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
}

// ====================================================================
//    GET ALL POSTS
// ========================================================================
const getAllPosts = async(req,res) =>{
    try {
        const posts = await Post.find().sort({date:-1})//sort in desc order//that is, the most recent first
        res.json(posts)//json(post:post)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
}

// ====================================================================
//    GET A SINGLE POST BY ID
// ========================================================================
const getSinglePostById = async(req,res) =>{
    try {
        const post = await Post.findById(req.params.id)
        if(!post){return res.status(404).json({msg:"Post not found"})}
        res.json(post)//json(post:post)
    } catch (err) {
        console.error(err.message)
        if(err.kind === "ObjectId"){return res.status(404).json({msg:"Post not found"})}
        res.status(500).send('Server Error')
    }
}

// ====================================================================
//    DELETE A POST
// ========================================================================
const deletePost = async(req,res) =>{
    try {
        const post = await Post.findById(req.params.id)
        if(!post){return res.status(404).json({msg:"Post not found"})}//check if post exist
        //check if user is the owner of the post he wanna delete//if true, granted else unathorized
        if(req.user.id !== post.user.toString()){return res.status(401).json({msg:"User not authorized to deleted this post"})}//post has a di property called "user" whichn is an object//req.user.id is a string. to make both type matched, we convert the object one to strring
        await post.remove()
        res.json({msg:"post deleted"})//json(post:post)
    } catch (err) {
        console.error(err.message)
        if(err.kind === "ObjectId"){return res.status(404).json({msg:"Post not found"})}
        res.status(500).send('Server Error')
    }
}
// ====================================================================
//    Like A POST
// ========================================================================
const likePost = async(req,res) =>{
    try {
        const post = await Post.findById(req.params.id)
        //
        const authUserLikeArray = post.likes.filter(like => like.user.toString() === req.user.id)//authLikeArray is an array that has only the likes of the authenticated user
       
       
        if(authUserLikeArray.length > 0){ //authLikeArray is greater than zero means he has liked it//

       //then remove it from likes array
        const elementsIdsArry = post.likes.map(like => like.user.toString())//elementsIds is a new array that only carries the ids(ie user) of post.likes array
        const elementIndex = elementsIdsArry.indexOf(req.user.id)//from elementsIds array, get the index of the element that match req.user.id
        post.likes.splice(elementIndex,1)//removing the element from profile.education using its index
        await post.save()//save it
        res.json(post.likes)
            // return res.status(400).json({msg:"Post Already Liked by you"})

        }else{ //authLikeArray is less than zero means he has not liked it//then add him to the post likes

            const authUserUnLikeArray = post.unlikes.filter(unlike => unlike.user.toString() === req.user.id)//authLikeArray is an array that has only the likes of the authenticated user
            if(authUserUnLikeArray.length > 0){
                const unkikeelementsIdsArry = post.unlikes.map(unlike => unlike.user.toString())//elementsIds is a new array that only carries the ids(ie user) of post.likes array
                const elementIndexx = unkikeelementsIdsArry.indexOf(req.user.id)//from elementsIds array, get the index of the element that match req.user.id
                post.unlikes.splice(elementIndexx,1)//removing the element from profile.education using its index
                // await post.save()//save it
                // res.json(post.unlikes)
                post.likes.unshift({user: req.user.id})//if not liked then allow to like
                await post.save()
                res.json(post.likes)
            }else{
                
            post.likes.unshift({user: req.user.id})//if not liked then allow to like
            await post.save()
            res.json(post.likes)
            }
        }
        
    } catch (err) {
        console.error(err.message)
        if(err.kind === "ObjectId"){return res.status(404).json({msg:"Post not found"})}
        res.status(500).send('Server Error')
    }
}
// // ====================================================================
// //    UnLike A POST
// // ========================================================================
const unlikePost = async(req,res) =>{
    try {
        const post = await Post.findById(req.params.postid)
        //
    //     const authUserUnLikeArray = post.Unlikes.filter(like => like.user.toString() === req.user.id)//authLikeArray is an array that has only the likes of the authenticated user
    //     if(authUserUnLikeArray.length === 0){return res.status(400).json({msg:"Post Has  NOT yet been Liked by you"})}//authLikeArray is greater than zero means he has liked it//
      
    //    //if however, he has liked then, do the following below
    //     //note that likes is an array in post//in order to delete an element in like array, we have to look for the index of the item we wanna delete, 
    //     //we must get the id of the element(user) the get the index of the element(by comparing it with that of the req.params.id) then use splice to remove it
    //     //step1: get the id of the elements 
    //     const elementsIdsArry = post.likes.map(like => like.user.toString())//elementsIds is a new array that only carries the ids(ie user) of post.likes array
    //     const elementIndex = elementsIdsArry.indexOf(req.user.id)//from elementsIds array, get the index of the element that match req.user.id
    //     post.likes.splice(elementIndex,1)//removing the element from profile.education using its index
    //     await post.save()//save it
    //     res.json(post.likes)
        const authUserUnLikeArray = post.unlikes.filter(unlike => unlike.user.toString() === req.user.id)//authLikeArray is an array that has only the likes of the authenticated user
        if(authUserUnLikeArray.length > 0){

 
           const elementsIdsArry = post.unlikes.map(unlike => unlike.user.toString())//elementsIds is a new array that only carries the ids(ie user) of post.likes array
            const elementIndex = elementsIdsArry.indexOf(req.user.id)//from elementsIds array, get the index of the element that match req.user.id
            post.unlikes.splice(elementIndex,1)//removing the element from profile.education using its index
            await post.save()//save it
            res.json(post.unlikes)
                // return res.status(400).json({msg:"Post Already Liked by you"})
            }else{
                //authLikeArray is greater than zero means he has liked it//
                post.unlikes.unshift({user: req.user.id})//if not liked then allow to like
                await post.save()
                res.json(post.unlikes)
            }
    } catch (err) {
        console.error(err.message)
        if(err.kind === "ObjectId"){return res.status(404).json({msg:"Post not found"})}
        res.status(500).send('Server Error')
    }
} 
// ====================================================================
//      CREATING comments on Post
// ========================================================================
const commentOnPost = async(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select('-password')
        const post = await Post.findById(req.params.postId)
        //create comment object
        const newComment = {
            text:req.body.text,//from form
            name:user.name,//from user
            avatar:user.photo,//from user
            user:req.user.id//from middleware
        }
       post.comments.unshift(newComment)//add comment to post.comment
        await post.save()//save post
        //both lines can be achieved with//'const post = await newPost(newPost)'
        res.json(post.comments)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
}
// ====================================================================
//      DELETE comments on Post
// ========================================================================
const deleteComment = async(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        // const user = await User.findById(req.user.id).select('-password')
        const post = await Post.findById(req.params.postId)//get the post that owns the comment
        const comment = await post.comments.find(comment => comment.id === req.params.commentId)//get the cooment whose id is equal to the id on route
        //check if comment exist
        if(!comment){return res.status(404).json({msg:"Comment does not exist"})}
        // check if the loggedin user deleting the comment is the user that owns the comment
        if(comment.user.toString() !== req.user.id){return res.status(401).json({msg:"Unauthorized operation"})}

        //note that comments is an array in post//in order to delete an element in comment array, we have to look for the index of the item we wanna delete, 
        //we must get the id of the element(user) then get the index of the element(with the help of req.user.id) then use splice to remove it
        //step1: get the id of the elements 
        const elementsIdsArry = post.comments.map(comment => comment.user.toString())//elementsIds is a new array that only carries the ids(ie user) of post.likes array
        const elementIndex = elementsIdsArry.indexOf(req.user.id)//from elementsIds array, get the index of the element that match req.user.id
        post.comments.splice(elementIndex,1)//removing the element from profile.education using its index
        
        await post.save()//save post
        //both lines can be achieved with//'const post = await newPost(newPost)'
        res.json(post.comments)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
}

// ----------------------------------------------------------------------------
 exports.createPosts = createPosts;
 exports.getAllPosts = getAllPosts;
 exports.getSinglePostById =getSinglePostById;
 exports.deletePost = deletePost;
 exports.likePost = likePost;
 exports.unlikePost = unlikePost;
 exports.commentOnPost = commentOnPost;
 exports.deleteComment = deleteComment;