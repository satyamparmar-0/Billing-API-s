const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    // user_id will not be used
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    items: [{
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
        },
        price: {
            type: Number,
        },
        product_name:{
            type:String
        },
    }],
    total_amount: {
        type: Number,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        // default: 'pending'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
