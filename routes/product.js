// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
const upload = require('../middlewares/cloud.image')
// Routes for product CRUD operations
router.get('/product',(req,res)=>{
    res.render('product')
})
router.post('/products', productController.createProduct);
router.get('/getproducts', productController.getAllProducts);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);
router.get('/products/by-category',productController.getByCategory);

module.exports = router;
