const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    orderId:{
        type:Number,
        required:true
    },
    orderDate:{
        type:Date,
        default:Date.now
    },
    totalAmount:{
        type:Number,
        required:true
    }
})

const Order = mongoose.model('Order',OrderSchema);

module.exports = Order;