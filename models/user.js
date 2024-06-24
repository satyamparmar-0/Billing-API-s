const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    fullname:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['user','admin','manager'],
        default:'user'
    },
   username:{
        type:String,
        unique:true,
        required:true
   },
   password:{
        type:String,
        required:true,
   },
   created_at:{
    type: Date,
    default: Date.now
   },
   updated_at:{
    type: Date,
    default: Date.nowe
   },
   active:{
    type:Boolean,
    default:true
   }
})

 UserSchema.pre('save', async function (next) {
     const user = this;
    
     if (user.isModified('password') || user.isNew) {
         try {
             const hashedPassword = await bcrypt.hash(user.password, 10); 
             user.password = hashedPassword;
         } catch (error) {
             return next(error);
         }
     }

     next();
 });

const User = mongoose.model('User',UserSchema);

module.exports = User;