// controllers/productController.js
const Product = require('../models/product');

// Controller function to create a new product
async function createProduct(req, res) {
    try {
        const { name, description, price, categoryId, subcategoryId, discount } = req.body;
        const product = new Product({ name, description, price, category: categoryId, subcategory: subcategoryId, discount });
        await product.save();
        res.status(201).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// Controller function to get all products
async function getAllProducts(req, res) {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// Controller function to update a product
async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        const { name, description, price, categoryId, subcategoryId,discount } = req.body;
        const product = await Product.findByIdAndUpdate(id, { name, description, price, category: categoryId, subcategory: subcategoryId,discount }, { new: true });
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
} 

// Controller function to delete a product
async function deleteProduct(req, res) {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

const getProducts = async (req, res) => {
    try {
      let query = {};
      // Apply filters if provided in the request query
      if (req.query.category) {
        query.category = req.query.category;
      }
      if (req.query.subcategory) {
        query.subcategory = req.query.subcategory;
      }
      let sortQuery = {};
      if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sortQuery[parts[0]] = parts[1] === 'desc' ? -1 : 1;
      }
      else {
        sortQuery.createdAt = -1; //sort by createdAt in descending order
      }
  
      // Fetch products based on query and apply sorting
      const products = await Product.find(query).sort(sortQuery);
  
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  const getByCategory = async(req,res)=>{
    try{
        let query = {};
        if(req.query.category){
          query.category = req.query.category;
        }
        const products = await Product.find(query);  
        res.json(products);
    }
    catch(error){
      res.status(500).json({error:error.message});
    }
  }

module.exports = {
    createProduct,
    getAllProducts,                                                                                                                         
    updateProduct,
    deleteProduct,
    getProducts,
    getByCategory
};
