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

// Before saving the user, hash the password

 UserSchema.pre('save', async function (next) {
     const user = this;
    
     // Hash the password only if it has been modified or is new
     if (user.isModified('password') || user.isNew) {
         try {
             const hashedPassword = await bcrypt.hash(user.password, 10); // Adjust the salt rounds
             user.password = hashedPassword;
         } catch (error) {
             return next(error);
         }
     }

     next();
 });

const User = mongoose.model('User',UserSchema);

module.exports = User;