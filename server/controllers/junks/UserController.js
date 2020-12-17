const { validationResult } = require('express-validator');
const User = require('../../models/UserModel.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const fs = require('fs')//for file interaction in folder//brought in to delete file if request didnt go through
// ====================================================================
//      REGISTER A USER
// ========================================================================
const getAllUsers = async(req,res,next) => {
    //if the user is authorizd, the request is going to have user from d authMiddleware(from d assignment req.user = decoded.user) that is ////request.user and request.user.id

   try {
       const users = await User.find();//via User.findById(request.user.id), the whole user info is passed to "user"//.select('-password'); will make sure "password" is excluded amonst the fetched data
        res.json(users)// send the fetched users info
    } catch (err) {
    console.error(err.message)
    res.status(500).send('SERVER ERROR') 
    // res.status(400).json({status: 'Failed', message: err.message})//send the statusCode 400//the status: failed// and the exact message: err.message
        
   }

};

// ====================================================================
//      REGISTER A USER
// ========================================================================
const registerUsers = async(req,res,next) => {//http://localhost:5000/api/users
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        if(req.file){//if there is a file in tis request/ delete it since this request will not go through
            fs.unlink(req.file.path,(err)=>{console.log(err)})
        }
        return res.status(400).json({ errors: errors.array() });
    }
      
    try {
         //SEE IF THE PERSON REGISTERING IS AN EXISTING USER
        let user = await User.findOne({email: req.body.email})//checking if req.body.email is in db
        if(user){
            if(req.file){//if there is a file in tis request/ delete it since this request will not go through
                fs.unlink(req.file.path,(err)=>{console.log(err)})
            }
            res.status(400).json({errors:[{msg:'User already exists'}]})
        }

         //ENCRYPT THE USER PASSWORD
         const hashedPassword = await bcrypt.hash(req.body.password,12)//12 is the strength of hashing

         //GET THE USER GRAVATAR
        //  const myGravater = gravatar.url(req.body.email,{s:'200',r:'pg',d:'mm'})//s=size,r=rating:pg= perental guidiance againt nekaed pics,d=default;mm=default image

        //create the user
        user = new User({
            name:req.body.name,
            email:req.body.email, 
            password:hashedPassword,
            photo:req.file.path,//from user
        })
          
        //save in db
        await user.save()
 //-----------------------------//RETURN JWT SO THE PERSON CAN USE IT FOR IMEDIATE LOGIN AFTER SIGNUP"-------------------------------------------
// json format: jwt.sign(payload, secretOrPrivateKey, [options, callback])//[options, callback] are optional//options can be expire time//callback for err or return token if success
        //create the payload//this is an object that has an object has value eg { user:{id:userid.name:user.name}} etc
        const payload = { user: {id: user.id}}//after "await user.save()", mongoose has converted the "_id" from mongodb to "id"
        const secretKey = config.get('jwtSecret')//get the key from config//this could have been a simple string

        //create token
        jwt.sign(payload,secretKey,{expiresIn:360000},(err,mytoken)=>{
            if(err) throw err;//else
             res.json({token:mytoken})//if no error the return token created
        })

        // res.send('user registered')
    //    res.json({users:users})
     } catch (err) {
         console.error(err.message);
         res.status(500).send('Server error') 
    }

//    res.send('registerd')
 }

 exports.registerUsers = registerUsers;
 exports.getAllUsers = getAllUsers