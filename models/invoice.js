const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        product_name: {
            type: String,
            required: true
        },
    }],
    total_amount: {
        type: Number,
        required: true
    },
    status:{
        type:Boolean,
        default:false
    },
    GST:{
        type:Number
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Invoice = mongoose.model('Invoice', InvoiceSchema);

module.exports = Invoice;