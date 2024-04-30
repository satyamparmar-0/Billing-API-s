const mongoose = require('mongoose');

const orderDetailSchema = new mongoose.Schema({
    orderDetailId:{
        type:Number,
        require:true
    },
    orderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order",
        required:true
    },
    quantity:{  
        type:Number,
        required:true
    },
    unitPrice:{
        type:Number,
    }
})  

const OrderDetail = mongoose.model('OrderDetail',orderDetailSchema);

module.exports = OrderDetail;