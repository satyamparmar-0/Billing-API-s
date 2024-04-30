const mongoose = require(mongoose);

const TransactionSchema = new mongoose.Schema({
    invoice_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Invoice'
    },
    transaction_type:{
        type:String,
        required:false
    },
    amount:{
        type:Number,
        required:true
    },
    transaction_date:{
        type:Date,
        default:Date.now,
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

