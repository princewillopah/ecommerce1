const mongoose = require('mongoose');


const SubCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please, Provide Category name'],
        minlength:  [1, 'Category name must contain 2 or more characters'],
        maxlength:  [32, 'Category name must contain 32 or less characters'],
      },
      slug: {
          type: String,
          unique: true,
          lowercase: true,
          index:true
      },
      parent:{type:mongoose.Schema.Types.ObjectId,ref:'Category',required: true},
 
  },

  {timestamps: true}
)

module.exports = mongoose.model('SubCategory',SubCategorySchema)