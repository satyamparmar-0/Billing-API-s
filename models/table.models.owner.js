const mongoose = require('mongoose');

const OwnerSchema = new mongoose.Schema({
    total_purchase:{
        type:Number,
        required:true
    },
    total_expense:{
        type:Number,
        required:true
    },
    total_payroll:{
        type:Number,
        required:true
    },
    asset_depreciation:{
        type:Number,
        required:true
    },
    total_sell_discount:{
        type:Number,
        required:true
    },
    total_sales:{
        type:Number,
        required:true
    },
    total_purchase_return:{
        type:Number,
        required:true
    },
    total_purchase_discount:{
        type:Number,
        required:true
    }
})

const OwnerTable = mongoose.model('OwnerTable',OwnerSchema);

module.exports = OwnerTable;