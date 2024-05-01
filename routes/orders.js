// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orders');

// Routes for product CRUD operations
// router.post('/createOrder',orderController.createOrder);
router.put('/updateOrder',orderController.updateOrder);
router.post('/createOrder',orderController.createOrder);
router.get('/getByUserId',orderController.getAllOrdersByUserId);
module.exports = router;
