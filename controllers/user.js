const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const {v4:uuid} = require('uuid')
const {SetUser} = require('../middlewares/auth')

// Use cookie-parser middleware
router.use(cookieParser());

// Use express-session middleware
router.use(session({
    secret: 'process.env.SESSION_SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
  }));

const User = require('../models/user');

exports.RenderSignup = (req,res) =>{
    res.render('signup');
}

exports.RenderLogin = (req,res)=>{
    res.render('login');
}

exports.Signup = async(req,res)=>{
    try{
        const {email,fullname,role,username,password} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({
            email,
            fullname,
            role,
            username,
            password,
        })
        await newUser.save();
        res.json('User Successfully Created ');
        // res.render('login');
    }
    catch(error){
        res.send(`Error While Signing up ${error}`);
    
    }
}

exports.Login = async(req,res)=>{
    try{
        const {username,password} = req.body;
        const user = await User.findOne({ username });
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!user.active) {
            return res.status(403).json({ error: 'User is inactive' });
          }

        if(!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
            }
        
        // if (password !== user.password) {
        //     return res.status(401).json({ message: 'Incorrect pa ssword' });
        // }  
        // const SessionId = uuid(); we do not need session id when we are creating the tokens for the user 

        const token = SetUser(user);
        res.cookie('uid',token, { httpOnly: true })
        res.json("Success");
        //return res.redirect('/users/profile');
    }
    catch(error){
        res.send(`Error while login ${error}`);
        
    }
}

exports.GetProfile = async(req,res)=>{
    const {username} = req.params;
    try {
        const user = await User.findOne({username});
        if(!user){
            res.status(404).json({error:"user is not found"});
        }
        res.json(user)
    } catch (error) {
        console.error('Error retrieving user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.deleteUser = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.active = false;
        await user.save();

        return res.status(200).json({ message: 'User deactivated successfully' });
    } catch (error) {
        console.error('Error deactivating user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
