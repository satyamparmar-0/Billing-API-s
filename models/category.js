const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: [2, 'Category name must be at least 2 characters long'],
    maxlength: [50, 'Category name cannot exceed 50 characters'],
  },
  description: String,
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
