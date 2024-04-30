// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');

// Routes for product CRUD operations
router.post('/products', productController.createProduct);
router.get('/products', productController.getAllProducts);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);
router.get('/products/by-category',productController.getByCategory);

module.exports = router;
