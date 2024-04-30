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
    cookie: { secure: false } // Set secure to true if your site is served over HTTPS
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
        const {username,password} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({
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

        // console.log(passwordMatch);

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
    