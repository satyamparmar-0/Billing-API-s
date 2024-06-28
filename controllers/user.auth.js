const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const {v4:uuid} = require('uuid')
const {SetUser} = require('../middlewares/auth')
const User = require('../models/user');
router.use(cookieParser());

// Use cookie-parser middleware

// Use express-session middleware
router.use(session({
    secret: 'process.env.SESSION_SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
  }));


exports.RenderSignup = (req,res) =>{
    res.render('signup');
}

exports.RenderLogin = (req,res)=>{
    res.render('login');
}
exports.Signup = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
          return res.status(400).json({ message: 'Email already exists.' });
        }
        const { email, role, username, password,mobileNo, address } = req.body;
        const newUser = new User({
            email,
            role,
            username,
            password,
            mobileNo,
            address
        });
        await newUser.save();
        res.json('User Successfully Created');
    } catch (error) {
        res.status(500).send(`Error While Signing up: ${error.message}`);
    }
}

exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.active) {
            return res.status(403).json({ error: 'User is inactive' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        const token = SetUser(user);
        res.cookie('uid', token, { httpOnly: true, secure: true, sameSite: 'strict' });

        let roleMessage;
        switch (user.role) {
            case 'admin':
                roleMessage = 'Admin login successful';
                break;
            case 'manager':
                roleMessage = 'Manager login successful';
                break;
            case 'user':
            default:
                roleMessage = 'User login successful';
                break;
        }

        res.json({
            message: roleMessage,
            role: user.role,
            token,
        });
    } catch (error) {
        res.status(500).send(`Error while login: ${error.message}`);
    }
};


exports.logout = async (req, res) => {
    try {
        res.clearCookie('uid');
        res.json({ message: 'Successfully logged out' });
    } catch (error) {
        res.status(500).json({ message: `Error while logging out: ${error.message}` });
    }
};


exports.GetProfile = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const loggedInUser = req.user; // Get authenticated user

        // Check role-based access control
        if (loggedInUser.role === 'admin' || loggedInUser.role === 'manager') {
            // Admins and managers can access any user's profile
            return res.json(user);
        } else if (loggedInUser.role === 'user' && loggedInUser.email === email) {
            // Regular users can only access their own profile
            return res.json(user);
        } else {
            // Unauthorized access
            return res.status(403).json({ error: "Access denied" });
        }
    } catch (error) {
        console.error('Error retrieving user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.deleteUser = async (req, res) => {
    const { email } = req.params;
    try {
        const user = await User.findOne({ email });

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

