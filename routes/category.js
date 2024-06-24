// routes/categoryRoutes.js

const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');

// Routes for category CRUD operations
router.post('/categories', categoryController.createCategory);
router.get('/categories', categoryController.getAllCategories);
router.put('/categories/:categoryId', categoryController.updateCategory);
router.delete('/categories/:id', categoryController.deleteCategory);

module.exports = router;