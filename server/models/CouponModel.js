const mongoose = require('mongoose');


const CouponSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        uppercase: true,
        required: [true, 'Coupon Name Is Required'],
        minlength:  [6, 'Coupon Name must contain 2 or more characters'],
        maxlength:  [32, 'Coupon Name must contain 32 or less characters'],
        // text: true//for search
      },
      expiry: {
        type: Date,
        required:true
      },
      discount: {
        type: Number,
        required: true
      }
 
  },

  {timestamps: true}
)

module.exports = mongoose.model('Coupon',CouponSchema)