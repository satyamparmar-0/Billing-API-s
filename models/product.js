const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  // subcategory: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Subcategory',
  //   required: true,
  // },
  discount:{
    type:Number,
    required:false
  },
  quantity_available:{
    type:Number,
    required:false
  },
  image:{
    type:Buffer,
    required:false
  },
  created_at:{
   type: Date,
   default: Date.now
  },
  updated_at:{
   type: Date,
   default: Date.now
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
