const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please, Provide title'],
        minlength:  [1, 'Title must contain 2 or more characters'],
        maxlength:  [32, 'Title must contain 32 or less characters'],
        text: true//for search
      },
      slug: {
          type: String,
          unique: true,
          lowercase: true,
          index:true
      },
      description: {
        type: String,
        trim: true,
        required: [true, 'Please, Provide description'],
        minlength:  [1, 'Category name must contain 2 or more characters'],
        maxlength:  [3000, 'Category name must contain 32 or less characters'],
        text: true//for search
      },
      price: {
        type: Number,
        trim: true,
        required: [true, 'Please, Provide price'],
        maxlength:  [3000, 'price must contain 32 or less characters'],
      },
      category:{type:mongoose.Schema.Types.ObjectId,ref:'Category'},
      subCategory:[
          {type:mongoose.Schema.Types.ObjectId,ref:'SubCategory'}
      ],
      quantity: Number,
      sold:{
          type: Number,
          default: 0
      },
      images: {
          type: Array
      },
      shipping: {
        type: String,
        enum: {
            values:  ['Yes','No'],
            message: 'Shipping must be either Yes or No'
        },
        default: 'Yes'
    },
      color: {
        type: String,
        enum: {
            values:  ['Black','Blue','Red','Green',"Silver","Gold","others"],
            message: 'Color must be either black, blue, green,gold, silver or Red'
        },
        default: 'Green'
    },
    brand: {
        type: String,
        enum: {
            values:  ['Armani','Rougn & Rumble','Polo Ralph','TM Luis',"Mark & Spenser","others"],
            message: "bRAND must be either 'Armani','Rougn & Rumble','Polo Ralph','TM Luis','Mark & Spenser'"
        },
        default: 'Armani'
    },
    ratings:[
      {
        star: Number,
        postedBy: {type: mongoose.Schema.Types.ObjectId, ref:'User'}
      }
    ]
 
  },

  {timestamps: true}
)

module.exports = mongoose.model('Product',ProductSchema)