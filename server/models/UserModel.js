const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const crypto = require('crypto');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please, Provide your name'],
      },
      email: {
          type: String,
          required: [true, 'Please, Provide your email'],
          unique: true,
          lowercase: true,
          index:true
      },
      password: {
          type: String,
          required: [true, 'please, privide password'],
          minlength:  [6, 'password must contain 6 or more characters'],
          // select: false//not to showup in any output
      },
       photo:  String,
      role: { // to render a user active or inactive(where the user delete his account)//we dont wanna completely delete the account incase the user wanted his deleted account
           type: String,//true if the account is active//false if the user has deleted his account
           required: true,// true for every existing user
           default: 'subscriber'//make sure no user sees this//only the admin knows this field exis
      },
      cart: {
          type: Array,
          default: []
      },
      address: String,
    //   wishlist: [
    //       {type: ObjectId, ref: "Product"}
    //     ],
    passwordChangedAt: Date,
    passwordResetToken: String,// store the reset token
    passwordResetExpires: Date// for security measures// time to reset password after resetToken is provided

  
  },
  {timestamps: true}
)

// bcrpt password before it is saved during registration
userSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next()// if the passord is mordified then dont encript it
//if not modified then
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined//we dont need this persisted in database// only needed for input comparison

  next()
})

userSchema.methods.createPasswordResetToken = function(){
  // // when the user forget password he is gonna provide his email he used in registering his account//
  // //the email is gonna be compared to those in d database// if found, the website is gonna generate a token and also encryp the token
  // //the original generated token is gonna be sent to the user email while the encryted token is gonna be saved in the database
  // //the use has only 10 mins to use the token to change his password// else, the token will expire
  // // the token from user will be compared with that of the encrypted token in database
  
   const resetToken = crypto.randomBytes(32).toString('hex')//creating the token
      this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')//encryp the generated token then asign it to this.passwordResetToken
      this.passwordResetExpires = Date.now() + 15 * 60 * 1000// add 10 mins to the curent time the reset Token was created and assign it to this.passwordResetExpires// this means the token expires in 10mins from when token was generated
      // console.log('reset: ',resetToken,'/ encrypted: ',this.passwordResetToken);
      // console.log(this.passwordResetExpires);
      return resetToken// to be sent to the email of user that forgot his password
      }
  




module.exports = mongoose.model('User',userSchema)