const User = require('../models/UserModel')
// const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
// const config = require('config')
const jwt = require('jsonwebtoken')

const sendEmail = require('../utils/email')
const crypto = require('crypto');

// exports.getAuth = getAuth = async(req,res,next) => {
//     //if the user is authorizd, the request is going to have user from d authMiddleware(from d assignment req.user = decoded.user) that is ////request.user and request.user.id

//    try {
//        const user = await User.findById(req.user.id).select('-password');//via User.findById(request.user.id), the whole user info is passed to "user"//.select('-password'); will make sure "password" is excluded amonst the fetched data
//         res.json(user)// send the fetched users info
//     } catch (err) {  
//     console.error(err.message)
//     res.status(500).send('SERVER ERROR') 
//    }

// };

// ====================================================================
//      SIGNIN ///
// ====================================================================


exports.logUser = async (req,res) => {///this route is pointing to http://localhost:5000/api/users 
    // Finds the validation errors in this request and wraps them in an object with handy functions
//   const errors = validationResult(req);
if(!req.body.email){  return res.status(400).json({status: 'Failed', message: ` please provide your email `})}
if(!req.body.password){  return res.status(400).json({status: 'Failed', message: ` please provide your password `})}
  
//   const {email,password} = req.body//getting all from req.body FROM FORM
  try{
    let user = await User.findOne({email:req.body.email})//querying//findthe user with such email//LHS email is from db//RHS email is from req.body
    if(!user){return res.status(400).json({status: 'Failed', message: 'Invalid Credentials: Make sure you enter the right email or password'})}//if user DOES NOT  exist return message
 //    if user WITH EMAIL exist then CHECK FOR PASSWORD
     const isMatch = await bcrypt.compare(req.body.password,user.password)//it return true if password(from res.body) and user.password(from database) are thesame
    //  if(!isMatch){return res.status(400).json({ message:'PASSWORD IS INCORRECT' })}//if isMatch DOES NOT  return true
      if(!isMatch){res.status(400).json({status: 'Failed', message: 'Invalid Credentials: Make sure you enter the right email or password'})}

    

   const mytoken =  jwt.sign({id: user.id},process.env.JWT_TOKEN_SECRET, {expiresIn: '30d'})

//IF  isMatch is true and d password is correct THEN RETURN CREATED JWT TOKEN TO THE FRONTEND TO USE FOR AUTHENTICATION
res.status(200).json({ status:'success', _id: user._id,name: user.name, email: user.email, role: user.role, token: mytoken});


 }catch(err){
     console.error(err.message)
    res.status(500).send('SERVER ERROR')
 }

}
// --------------------------------------------------------------------------------------------------
                        // REGISTER
// --------------------------------------------------------------------------------------------------
exports.register = async(req,res,next)=>{

  try {
      //SEE IF THE PERSON REGISTERING IS AN EXISTING USER
     let userExist = await User.findOne({email: req.body.email})//checking if req.body.email is in db
     if(userExist){
         res.status(400).json({message:'User already exists'})
     }
     //create the user
     const user = new User({
         name:req.body.name,
         email:req.body.email, 
         password: req.body.password, //it has been encrypted in model
         role: req.body.role
     })   
     //save in db
     await user.save()
  //  if(user){
     
   const mytoken =  jwt.sign({id: user.id},process.env.JWT_TOKEN_SECRET, {expiresIn: '30d'})

   //IF  isMatch is true and d password is correct THEN RETURN CREATED JWT TOKEN TO THE FRONTEND TO USE FOR AUTHENTICATION
   res.status(201).json({ status:'success', _id: user._id,name: user.name, email: user.email, role: user.role, token: mytoken});
  // }else{
  //     res.status(400).json({ status: 'Failed', message:'Invalid User data entered' })
  // }

     // res.send('user registered')
 //    res.json({users:users})
  } catch (err) {
      if(err.code === 11000){
          const username = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]//match(/(["'])(\\?.)*?\1/)[0] get the chtching the tourname and getting the first one
          res.status(400).json({status: 'Failed', message: `Duplicated User email: ${username}. please use another email `})
      }else{
          res.status(400).json({status: 'Failed', message: err.message})//send the statusCode 400//the status: failed// and the exact message: err.message
      }
 }


}

// ============================================================================================================================
// forget paddword and reset passowrd
// ==========================================================================================================================
exports.forgetPassword = async (req,res) =>{
   
    // steps
// 1 GET USER BASED ON POSTED EMAIL
// 2 GENERATE RANDOM RESET TOKEN
// 3 SEND IT TO USER EMAIL

// GET USER BASED ON EMAIL
// 2. check if user exist and password is correct
const user = await User.findOne({email: req.body.email})//querying//findthe user with such email//LHS email is from db//RHS email is from req.body//checking the db if req.body.email is in there
if(!user){return res.status(404).json({ status: 'Failed', message:'there is no user with the email provided' })}//if user DOES NOT  exist return message

// 2 GENERATE RANDOM RESET TOKEN
const resetToken = user.createPasswordResetToken()//createPasswordResetToken() is in userModel handling the logic that would have been written in here//it returns the reset token
await user.save({validateBeforeSave: false})//since we are updating some fields in user model eg  passwordResetToken and passwordResetExpires, we have to save it//{validateBeforeSave: false} is to make sure the required validations for that user model do not hold here 

// 3 SEND IT TO USER EMAIL

const resentLink = '<p>Click <a href="http://localhost:3000/password-reset/' + resetToken + '">here</a> to reset your password</p>'
const message = `Did you forget your password? Send a PATCH request with your new password and confirm password to the URL below:\n 
${resentLink}
 \n Please ignore this email if you did not forget your password`


try {//I DEFINED USER OUTSIDE THE TRY BLOCK SO THAT IT WILL BE VISIBLE TO BOTH TRY AND CATCH

await sendEmail({email: user.email, subject: 'Your password reset token only vilid for 10 minutes', message: message, html: message})
res.status(200).json({status:'Success',message: 'reset token sent to your email'})


// res.status(200).json({status: 'success' , message: resetToken})
} catch (err) {//if error
    user.passwordResetToken = undefined//they sould be set undefind in db since the operation was unsuccessful//FOR USER TO BE SEEN HERE, IT HAS TO BE DECLEAR OUTSIDE THE TRY BLOCK
    user.passwordResetExpires = undefined
    await user.save({validateBeforeSave: false}) //any alteration of the user model should require this with or without the {validateBeforeSave: false}

    res.status(500).json({status: 'failed' ,message: 'there was an error sending the email you provided. please try again later '})
    console.log(err.message)
}


}

//---------------------------------------------
exports.resetPassword = async (req,res,next) =>{  
    //1. gET USER BASED ON TOKEN
    //2. IF TOKEN HAS NOT EXPIRED AND THERE IS A USER THEN SET A NEW PASSWORD
    //3. UPDATE changePasswordAt property in the db bcos of jwt token monitor
    //4. log the user in, send jwt
  
      try {
          
          //1. GET USER BASED ON TOKEN:
          //the token comming from the forgetpassword is real token//we need to encrypt it so we can compare it with the encrypted token stored in db
          //if the comparison is true, the we get the user owing that token
        //   const hashedToken = crypto.createHash('sha256').update(req.body.resetPasswordToken).digest('hex')//resetPasswordToken is  params from url
        const hashedToken = crypto.createHash('sha256').update(req.body.resettoken).digest('hex') 
        //get user that has this token match and  passwordResetExpires great than the future// 
          // const user = await User.findOne({passwordResetToken: hashedToken, passwordResetExpires: {$gt: Date.now()}})//both tokens are now encrypted so we can find hashedToken against the ones in db
          const user = await User.findOne({passwordResetToken: hashedToken})//both tokens are now encrypted so we can find hashedToken against the ones in db
          //2. IF TOKEN HAS  EXPIRED AND THERE IS A USER THEN Ssend error message
          if(!user){return res.status(400).json({ status: 'Failed', message:'sorry, this token has expired' })}//if user DOES NOT  exist return message
  
              //2. IF TOKEN HAS NOT EXPIRED AND THERE IS A USER THEN SET A NEW PASSWORD
          user.password = req.body.password;
          user.passwordResetToken = undefined
          user.passwordResetExpires = undefined
          //3. UPDATE changePasswordAt property in the db bcos of jwt token monitor
          user.passwordChangedAt = Date.now() - 1000//currentdate minus 1 sec//to get the time the password is changed againg jwt issuedAt time//this should alway be less than the jwt issues at time, else the jwt verification will ask u to request another token
          await user.save()
  
          //4. log the user in, send jwt
        //   const token = jwt.sign({ id: user._id},process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRY_TIME})
        //   res.status(201).json({ status:'success',token: token});
        
//    const mytoken =  jwt.sign({id: user.id},process.env.JWT_TOKEN_SECRET, {expiresIn: '30d'})
   //IF  isMatch is true and d password is correct THEN RETURN CREATED JWT TOKEN TO THE FRONTEND TO USE FOR AUTHENTICATION
//    res.status(201).json({ status:'success', _id: user._id,name: user.name, email: user.email, role: user.role, token: mytoken});
res.status(201).json({ status:'success',message: 'Your password has been reset. Please enter your new password'});
  
      } catch (err) {
          
          res.status(400).json({ status:'failed',message: err.message});
      }
  
  
  }

  // =============================this is for user that wanna change his password=================================
exports.updatePassword = async(req,res,next) => {
    //1) get the user from collection
    //2) check if the posted current password is correct
    //3) if correct the update the password
    //4) log user in then send jwt
        try {//I DEFINED USER OUTSIDE THE TRY BLOCK SO THAT IT WILL BE VISIBLE TO BOTH TRY AND CATCH
        //1) get the user from collection
            const user = await User.findById(req.user.id)//this updatepassword is only available to authenticated users// so their user info is available to request from the jwt middleware we sent at the end
            //2) check if the posted current password is correct
            //    if user WITH EMAIL exist then CHECK FOR PASSWORD
            
            // const isMatch = await bcrypt.compare(req.body.currentPassword, user.password)//it return true if current password(from res.body) and user.password(from database) are thesame
            // if(!isMatch){return res.status(400).json({status: 'Failed', message:'Incorrect password' })}//if isMatch DOES NOT  return true
    
            //3) if correct the update the password
            user.password = req.body.password;//req.body.password is new password
            // if(req.body.password !== req.body.passwordConfirm){return res.status(400).json({status: 'Failed', message:'both passwords must match' })}
    
            //3. UPDATE changePasswordAt property in the db bcos of jwt token monitor
            user.passwordChangedAt = Date.now() - 1000//currentdate minus 1 sec//to get the time the password is changed againg jwt issuedAt time//this should alway be less than the jwt issues at time, else the jwt verification will ask u to request another token
            await user.save()
    
            //4) log user in then send jwt
            // const token = jwt.sign({ id: user._id},process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRY_TIME})
            // res.status(201).json({ status:'success',token: token});
    
            res.status(201).json({ status:'success',message: 'Your password has been Updated successffly'});
        } catch (err) {//if error
    
            res.status(500).json({status: 'failed' ,message: err.message})
        }
    
    }

