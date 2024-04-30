// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orders');

// Routes for product CRUD operations
router.post('/createOrder', orderController.createOrder);

module.exports = router;
