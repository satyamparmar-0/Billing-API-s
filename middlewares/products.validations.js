// middlewares/productValidation.js
const Joi = require('joi');

const productSchema = Joi.object({
  itemname: Joi.string()
    .required()
    .messages({
      'string.base': 'Item name should be a type of text',
      'string.empty': 'Item name cannot be empty',
      'any.required': 'Item name is a required field'
    }),
  description: Joi.string()
    .optional()
    .messages({
      'string.base': 'Description should be a type of text'
    }),
  baseprice: Joi.number()
    .required()
    .messages({
      'number.base': 'Base price should be a type of number',
      'any.required': 'Base price is a required field'
    }),
  category: Joi.string()
    .required()
    .messages({
      'string.base': 'Category should be a type of text',
      'string.empty': 'Category cannot be empty',
      'any.required': 'Category is a required field'
    }),
  subcategory: Joi.string()
    .required()
    .messages({
      'string.base': 'Subcategory should be a type of text',
      'string.empty': 'Subcategory cannot be empty',
      'any.required': 'Subcategory is a required field'
    }),
  discount: Joi.number()
    .optional()
    .messages({
      'number.base': 'Discount should be a type of number'
    }),
  quantityavailable: Joi.number()
    .optional()
    .messages({
      'number.base': 'Quantity available should be a type of number'
    }),
  image: Joi.string()
    .optional()
    .messages({
      'string.base': 'Image should be a type of text'
    }),
  cuisine: Joi.string()
    .optional()
    .messages({
      'string.base': 'Cuisine should be a type of text'
    }),
  foodtype: Joi.string()
    .optional()
    .messages({
      'string.base': 'Food type should be a type of text'
    }),
  created_at: Joi.date()
    .default(Date.now)
    .optional(),
  updated_at: Joi.date()
    .default(Date.now)
    .optional()
});

const validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = validateProduct;
