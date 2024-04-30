const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  created_at:{
    type: Date,
    default: Date.now
   },
   updated_at:{
    type: Date,
    default: Date.nowe
   }
});



subcategorySchema.index({ category: 1 });

const Subcategory = mongoose.model('Subcategory', subcategorySchema);

module.exports = Subcategory;
