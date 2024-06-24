const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const authenticateUser = async (req, res, next) => {
    try {
        // Check if the Authorization header is present
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: 'Access denied. Token not provided.' });
        }

        // Verify the token
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.SECRET_KEY);
        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: 'User not found.' });
        }

        // Attach the user object to the request for future use
        req.user = user;
        next(); // Continue to the next middleware or route handler
    } catch (error) {
        console.error(`Error while authenticating user: ${error}`);
        return res.status(401).json({ message: 'Invalid token.' });
    }
};

function SetUser(user) {
    return jwt.sign(
        {
            _id: user.id,
            username: user.username,
            role: user.role
        },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
    );
}

// Function to decode a JWT token
function GetUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
        console.error(`Error while decoding token: ${error}`);
        return null;
    }
}

async function restrictToUserLoginOnly(req,res,next){
    const UserId = req.cookies.uid;
    if(!UserId) return res.redirect('/login');
    const user = GetUser(UserId)

    if(!user) return res.redirect('/login');

    req.user = user;
    next();

}

module.exports = {authenticateUser,SetUser,GetUser,restrictToUserLoginOnly};
