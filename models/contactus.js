const mongoose = require('mongoose');

const contactusSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    mobNumber:{
        type:Number,
        require:true,
    },
    city:{
        type:String,
        required:true
    },
    restaurantName:{
        type:String,
        required:true
    }
});

const ContactUs = mongoose.model('ContactUs',contactusSchema);

module.exports = ContactUs;