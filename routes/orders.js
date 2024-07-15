// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orders');

// Routes for product CRUD operations
// router.post('/createOrder',orderController.createOrder);
router.put('/updateorder',orderController.updateOrder);
router.post('/createorder',orderController.createOrder);
router.get('/getbyuserid',orderController.getAllOrdersByUserId);
router.delete('/deleteall',orderController.deleteallorder);
router.post('/addtocart',orderController.addToCart);
router.delete('/deleteorder/:id',orderController.deleteoneproduct);
router.post('/createbycart',orderController.createOrderbycart);
module.exports = router;
