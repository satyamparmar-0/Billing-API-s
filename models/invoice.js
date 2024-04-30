const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
    orderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order',
        required:true
    },
    invoiceDate:{
        type:Date,
        default:Date.now
    },
    paymenStatus:{
        type:Boolean,
        default:false
    },
    totalAmount:{
       type:Number,
        required:true
    },
    created_at:{
     type: Date,
     default: Date.now
    },
    updated_at:{ 
     type: Date,
     default: Date.nowe
    }
})

const Invoice = mongoose.model('Invoice',InvoiceSchema);

module.exports = Invoice;