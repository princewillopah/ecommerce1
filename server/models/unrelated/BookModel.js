const mongoose = require('mongoose');
// const slugify = require('slugify')
// const validator = require('validator')
// Create Schema
const BookSchema = new mongoose.Schema({
  title: {
      type: String,
      required: [true, 'A Book must have a title'],
      unique: true,
      trim: true,
      maxlength: [40, 'A Book name must have less or equal than 40 characters'],
      minlength: [2, 'A Book name must have more or equal than 2 characters'],
    //   validate:  [validator.isAlpha, 'Book name must contain only letters']// to check if the string contains only letters
    },
    rating: {
        type: Number,
        default: 4.5
        },
    stock:{
      type:Number,
      default: 0
    },


    description: {
        type: String,
        trim: true,
    },

    imageCover: {
        type: String,
        // required: [true, 'A Book must have a imageCover']
    },
    author:{type: mongoose.Schema.ObjectId, ref: 'User'},

     contributors: [
         {type: mongoose.Schema.ObjectId, ref: 'User'} //many to many embedded relationships with user
     ]

},
{timestamps: true}
);

// BookSchema.virtual('durationWeeks').get(function(){
//     return this.duration / 7//return the in weeks converstion
// })

//for children of this Book// parent child
// BookSchema.virtual('reviews', {//what we re gonna use in Book controller to populate review
//    ref: 'Review',//model to connect with
//    foreignField: 'Book',//where d id is stored in review model
//    localField: '_id'//the id in this model that link to foreignField

// })

// DOCUMENT MIDDLEWARE// IT RUNS BEFORE .save() and .create()//it is used to perform so op
//here we create a slug with Doccument middleware  on the name field
// BookSchema.pre('save', function(next){
//   this.slug = slugify(this.name, {lower: true});
//   next()
// })

// BookSchema.pre(/^find/, function(next){//QUERY MIDDLEWARE: IT RUNS BEFORE ANY QUERY(EG  .find()) is executed
//     this.populate({path: 'guides', select: '-__v -passwordChangedAt -password'})//to populate any of the find() methods with its guides field without the __v or passwordChangedAt
//     next()
//   })



module.exports = mongoose.model('Book', BookSchema);
