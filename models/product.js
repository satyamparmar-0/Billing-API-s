const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  itemname: {
    type: String,
    required: true,
  },
  description: String,
  baseprice: {
    type: Number,
    required: true,
  },
  category: {
    // type: mongoose.Schema.Types.ObjectId,
    type:String,
    // ref: 'Category',
    required: true,
  },
  subcategory: {
    type:String,
    required: true,
  },
  discount:{
    type:Number,
    required:false
  },
  quantityavailable:{
    type:Number,
    required:false
  },
  image:{
    type:Buffer,
    required:false
  },
  cuisine:{
    type:String,
    required:false
  },
  foodtype:{
    type:String,
    required:false
  },
  customizations: [
    {
      customizationsType: {
        type: String,
        required: false
      },
      customizations: [
        {
          customizationName: {
            type: String,
            required: false
          },
          additionalprice: {
            type: Number,
            required: false,
            default: 0.00
          }
        }
      ]
    }
  ],
  filters: {
    GlutenFree: {
      type: String,
      required:false
      // enum: ['Yes', 'No'],
      // default: 'No'
    },
    Spicy: {
      type: String,
      required:false
      // enum: ['Yes', 'No'],
      // default: 'No'
    }
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
