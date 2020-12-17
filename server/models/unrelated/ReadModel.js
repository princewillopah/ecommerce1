const mongoose = require('mongoose');
// const Tour = require('./tourModel')
// const validator = require('validator')

const readSchema = new mongoose.Schema({
   
    book: {
      type: mongoose.Schema.ObjectId, 
      ref: 'Book',
      required: [true, 'Review must belong to a book'],
    },
    reader: {
      type: mongoose.Schema.ObjectId, 
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
    borrowDate: {
      type: Date,
      default: Date.now()
    },
    returnDate: {
      type: Date,
    },
    returned:{
      type: Boolean,
      default:false
    }

},//end schma
{timestamps: true}
)

// readSchema.pre(/^find/, function(next){
//    this.populate({path: 'tour', select: 'name -guides'})//to populate any of the find() methods with its guides field without the __v or passwordChangedAt
//        .populate({path: 'user', select: 'name photo'})
//    next()
//  })

/////////for middleware //////////////////
//we are gonna calculate the averageRating and the numner of rating each time a new review is added to the tour,
// or when the review of the tour is updated or deleted// this is the situation that will make the rating/average rating change
//to implement this, we create a function that will take in a tourId, calculate the averageRating/number of rating that exist in review collection for that tour,
// and then update the corresponding tour document//in order to use this function, we use a middleware to call the function each time the reviw of the tour is updated/deleted/created

// the staic funtion is static in order to call the aggregate function 
// reviewSchema.statics.calculateAverageRatings = async function(tourId){//this id is the id of the tour that has this current review//
//   const stats = await this.aggregate([//the "this" keyword points to the model// so this.aggregate([]) is same as Review.aggregate([])//the reseason we use static function is bacause we wanna call the model directly
//    {
//      $match: {tour: tourId}   //first step is to select allreviews belonging to the tour whose id is paased
//    },
//    {
//      $group: {
//        _id: '$tour',
//        nRating: {$sum: 1},//sum all the number of rating
//        avgRating: {$avg: '$rating'}//
//      }
//    }
//   ])
//   // update the tour that has the current review
//   if(stats.length > 0){
//     console.log(stats)
//     await Tour.findByIdAndUpdate(tourId, {ratingsQuantity: stats[0].nRating, ratingsAverage: stats[0].avgRating})
//   }else{
//     await Tour.findByIdAndUpdate(tourId, {ratingsQuantity: 0, ratingsAverage: 4.5})
//   }

// }//calculateAverageRatings

// reviewSchema.post('save', function(){//this points to the current review when it is being saved
//   this.constructor.calculateAverageRatings(this.tour)//calculateAverageRatings() needs the tour id from current review//this.constructor.calculateAverageRatings() represent Review.calculateAverageRatings()// thats how tocall the function in the Review model// we used this.constructor. because Review is not available at this point
// })

// /////////////////////updating calculateAverageRatings()  update and delete ////////////////////////
// //for findByIdndUpdate & findByIdndDelete
// reviewSchema.pre(/^findOneAnd/, async function(next){
//   this.currentlySavedAndStoreReview = await this.findOne();//this will find the current//we use this before .currentlySavedAndStoreReview  because we wanna send it to reviewSchema.post() below
//   next()
// })

// reviewSchema.post(/^findOneAnd/, async function(){//this this.findOne(); does not work here in reviewSchema.post() else we would have done it here instead of the direct above function

//   await this.currentlySavedAndStoreReview.constructor.calculateAverageRatings(this.currentlySavedAndStoreReview.tour._id)//this.currentlySavedAndStoreReview is the found review sent from the function directly above
// })
module.exports = mongoose.model('Read', readSchema);


