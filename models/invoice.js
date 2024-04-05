const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
    invoiceId:{
        type:Number,
        required:true
    },
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
    }
})

const Invoice = mongoose.model('Invoice',InvoiceSchema);

module.exports = Invoice;