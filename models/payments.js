const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    invoice_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Invoice'
    },
    payment_date:{
        type:Date,
        default:Date.now
    },
    amount:{
        type:Number,
        required:true
    },
    payment_method:{
        type:String,
        required:false
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

const Payment = mongoose.model('Payment',PaymentSchema);

module.exports = Payment;