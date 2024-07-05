const Joi = require('joi');

const signupValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format.',
    'string.empty': 'Email is required.',
    'any.required': 'Email is required.'
  }),
  role: Joi.string().valid('user', 'admin', 'manager').optional().messages({
    'any.only': 'Invalid role.'
  }),
  username: Joi.string().required().messages({
    'string.empty': 'Username is required.',
    'any.required': 'Username is required.'
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'Password must be at least 8 characters long.',
    'string.empty': 'Password is required.',
    'any.required': 'Password is required.'
  }),
  mobileNo: Joi.string().pattern(/^\d{10}$/).required().messages({
    'string.pattern.base': 'Mobile number must be 10 digits long.',
    'string.empty': 'Mobile number is required.',
    'any.required': 'Mobile number is required.'
  }),
  address: Joi.string().required().messages({
    'string.empty': 'Address is required.',
    'any.required': 'Address is required.'
  })
});

const validateSignup = (req, res, next) => {
  const { error } = signupValidationSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessages = error.details.map(detail => detail.message);
    return res.status(400).json({ message: 'Validation error', errors: errorMessages });
  }
  next();
};

module.exports = validateSignup;
