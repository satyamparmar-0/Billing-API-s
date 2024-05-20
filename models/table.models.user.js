const mongoose = require('mongoose')

const tableSchema = new mongoose.Schema({
    Date:{
        type:String,
        required:true,
    },
    selectTime:{
        type:String,
        required:true
    },
    totalGuests:{
        type:Number,
        required:true,
    },
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    message:{
        type:String
    }
},{timestamps:true})

const UserTable = mongoose.model('UserTable',tableSchema);

module.exports = UserTable;