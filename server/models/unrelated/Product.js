const mongoose = require('mongoose');

// Create Schema
const ProductSchema = new mongoose.Schema({
    writer:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    title: {type: String,maxlength:50},
    description: {type: String},
    price: {type: Number,default: 0},
    images: {type: Array, default: []},
    continents: {type: Number, default: 1},
    sold: {type: Number, maxlength: 100, default: 0},
    views: {type: Number, default: 0},
  },
  {timestamps: true}

);

module.exports = mongoose.model('Product', ProductSchema);
