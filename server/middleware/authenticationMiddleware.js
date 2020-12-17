// const config = require('config')
// const {jwtSecret} = require('../config/keys')
const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')


//THIS IS A MIDDLEWARE TO RESTRICT AUTHENTICATION AND AUTHORIZATION
// STEPS
// 1) GET TOKEN AND CHECK IF IT IS THERE
// 2) VERIFY TOKEN
// 3) CHECK IF USER STILL EXIST
// 4) CHECK IF USER CHANGE PASSWORD AFTER LOGGEN IN AND TOKEN WAS ISSUED

  
exports.authMiddleware = async(req,res,next) => {    
// 1) GET TOKEN AND CHECK IF IT IS THERE
let token;//the variable to store the token if there is any
 if(req.headers.authorization && req.headers.authorization.startsWith('Bearer') ){
    token = req.headers.authorization.split(' ')[1]// req.headers.authorization is a string of "Bearer jhfesdfnfejkmnkfvkffvnfgvfkmnfadjknfdvkjafd..." just get the second part
}
 if(!token){
     return  res.status(401).json({status: 'NO TOKEN:', message: 'Authorization Denied: Pls log in to get access'})
 }
 // // 2 IF TOKEN IS PROVIDED THEN check if it is a valid token from an existing user and the token has not expired
 try {
    const decoded = await jwt.verify(token,process.env.JWT_TOKEN_SECRET);
    
    
 // 3) CHECK IF USER STILL EXIST
    const user = await User.findById(decoded.id).select('-password')
    if(!user){//THIS IS NECESSARY INCASE THE USER IS NO LOGER IN THE DB BUT THE TOKEN STORED IN CLIENT SIDE STILL EXIST and has not expired
       return res.status(401).json({status: 'Failed', message: `User that owns this token no longer exist`})
    }
    
    
    req.user = user//RHS user is the one defined above//we assign it to req.user SO WE CAN HAVE ASSESS TO req.user in any route that we use this mildleware 
 
 } catch (err) {

    if(err.name === 'JsonWebTokenError'){
        res.status(401).json({status: 'Failed', message: `Invalid Token: Please  Login Again`})
    }else if(err.name === 'TokenExpiredError'){
        res.status(401).json({status: 'Failed', message: `Expired Token: Please  Login Again`})
    }else{
        res.status(401).json({status: 'Failed', message: err.message})//send the statusCode 400//the status: failed// and the exact message: err.message
    }
  
 }

 next()//NONE of this return statement is met then the nect() will take the user to the route they wanna access
}

// =======================================================================================
// Authorized admins only
// ======================================================================================
exports.isAdmin = (req,res,next) => {
   if(req.user && req.user.role === 'admin'){ //if the user is logged in and he is an admin
      next()// move to the next middleware
   }else{
     res.status(401)
     throw new Error('Not Authorized: This Operation is for Admins Only')
   }
}
exports.isReader = (req,res,next) => {
   if(req.user && (req.user.role === 'admin' || req.user.role === 'reader')){ //if the user is logged in and he is an admin
      next()// move to the next middleware
   }else{
     res.status(401).json({status:'FAILED',message:'Not Authorized: This Operation is for Admins/Readers Only'})
   // res.status(401)
   //   throw new Error('Not Authorized: This Operation is for Admins/Readers Only')
   }
}




// =======================================================================================
// ANOTHER METHOD
// ======================================================================================
// module.exports = function(request,response,next){
//     const token = request.header('my-token');// GET THE TOKEN FROM THE HEADER/this is because when we make a request from the frontend to a protected route, we must send the header along//the header has a key "x-auth-token" we created//the header has the token that was givin to use by server while signing up or signing 

//     if(!token){// RETURN MESSAGE IF THERE IS NO TOKEN PROVIDED
//        return response.status(401).json({message:'NO TOKEN: Authorization Denied'})
//     }
// // IF TOKEN IS PROVIDED THEN
//     try  {
//         //verify token://the format://jwt.verify(token, secretOrPublicKey, [options, callback]) where token is the token sent
//        const decoded = jwt.verify(token,jwtSecret);//verify the token sent and put the jwt token payload in decoded//note the jwt payload contain the user id//remember when creating the payload: {user:{id:ser.id}}//thus, decoded = {user:id:userid}
//       // decoded = { userId: '5f3f78ea03c77c7330354677', iat: 1598004740,exp: 1598364740 }
//        request.user = decoded;//decoded contain user object whose value is only id from the payload sent with the token(in auth or user routes)// we assign it to request.user SO WE CAN HAVE ASSESS TO request.user in the route
//        console.log(request.user)//therefore,request.user is  { userId: '5f3f78ea03c77c7330354677', iat: 1598004740,exp: 1598364740 }
//        console.log(request.user.userId)// the user id
//        next()//call next to move on

//     }catch(err){
//         response.status(401).json({message:'INVALID TOKEN: Authorization Denied'})
        
//     }


// }

// =======================================================================================
// SECOND METHOD
// ======================================================================================
// const jwt = require('jsonwebtoken');
// const {jwtSecret} = require('../config/keys')
// module.exports = (req, res, next) => {
//     const token = req.header('my-token'); //get the token by title "my-token"
//     if(!token){// RETURN MESSAGE IF THERE IS NO TOKEN PROVIDED
//                return res.status(401).json({message:'NO TOKEN PROVIDED: Authorization Denied'})
//             }
//   try {
   
//     const decodedToken = jwt.verify(token, jwtSecret);//com
//     req.userId = decodedToken.userId;//this token has a property "userId" that caries the id of the user //assign it to  req.userId

//     // if (req.body.userId !== userId) {
//     //     res.status(401).json({message:'INVALID TOKEN: Authorization Denied hhh'})
//     // } else {
//       next();
//     // }
//   } catch {
//     res.status(401).json({message:'INVALID TOKEN: Authorization Denied'})
//   }
// };

// =======================================================================================
// THIRD METHOD
// ======================================================================================
// const jwt = require('jsonwebtoken');
// const {jwtSecret} = require('../config/keys')

// module.exports = (req, res, next) => {
//     const authHeader = req.headers.authorization;

//     if (authHeader) {
//         const token = authHeader.split(' ')[1];

//         jwt.verify(token, jwtSecret, (err, payload) => {
//             if (err) {
//                 return res.sendStatus(403);
//             }
//             console.log(payload)//{ userId: '5f3f78ea03c77c7330354677', iat: 1598004740,exp: 1598364740 }
//             req.user_id = payload.userId;//payloadhas a property' userId' that carries d id of the user// we re assigning it to req.user_id
//             console.log(req.user_id)//get only the user id
//             next();
//         });
//     } else {
//         res.sendStatus(401);
//     }
// };