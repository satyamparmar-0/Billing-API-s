// controllers/subcategoryController.js

const Subcategory = require('../models/subCategory');

// Controller function to create a new subcategory
async function createSubcategory(req, res) {
    try {
        const { name, description, categoryId } = req.body;
        const subcategory = new Subcategory({ name, description, category: categoryId });
        await subcategory.save();
        res.status(201).json({ success: true, data: subcategory });
    }   catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// Controller function to get all subcategories
async function getAllSubcategories(req, res) {
    try {
        const subcategories = await Subcategory.find();
        res.status(200).json({ success: true, data: subcategories });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// Controller function to update a subcategory
async function updateSubcategory(req, res) {
    try {
        const { id } = req.params;
        const { name, description, categoryId } = req.body;
        const subcategory = await Subcategory.findByIdAndUpdate(id, { name, description, category: categoryId }, { new: true });
        res.status(200).json({ success: true, data: subcategory });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// Controller function to delete a subcategory
async function deleteSubcategory(req, res) {
    try {
        const { id } = req.params;
        await Subcategory.findByIdAndDelete(id);
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

module.exports = {
    createSubcategory,
    getAllSubcategories,
    updateSubcategory,
    deleteSubcategory
};
