// routes/subcategoryRoutes.js

const express = require('express');
const router = express.Router();
const subcategoryController = require('../controllers/subCategory');

// Routes for subcategory CRUD operations
router.post('/subcategories', subcategoryController.createSubcategory);
router.get('/subcategories', subcategoryController.getAllSubcategories);
router.put('/subcategories/:id', subcategoryController.updateSubcategory);
router.delete('/subcategories/:id', subcategoryController.deleteSubcategory);

module.exports = router;
