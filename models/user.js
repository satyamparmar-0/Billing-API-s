const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
   username:{
        type:String,
        unique:true,
        required:true
   },
   password:{
        type:String,
        required:true,
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