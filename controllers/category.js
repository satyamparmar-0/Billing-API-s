const Category = require('../models/category');
// Controller function to create a new category
async function createCategory(req, res) {
    try {
        const { name, description } = req.body;
        const category = new Category({ name, description });
        await category.save();
        res.status(201).json({ success: true, data: category });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// Controller function to get all categories
async function getAllCategories(req, res) {
    try {
        const categories = await Category.find();
        res.status(200).json({ success: true, data: categories });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// Controller function to update a category
async function updateCategory(req, res) {
    try {
        const { categoryId } = req.params;
        const { name, description } = req.body;
        const category = await Category.findByIdAndUpdate(categoryId, { name, description }, { new: true });
        res.status(200).json({ success: true, data: category });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// Controller function to delete a category
async function deleteCategory(req, res) {
    try {
        const { id } = req.params;
        await Category.findByIdAndDelete(id);
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

module.exports = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
};
