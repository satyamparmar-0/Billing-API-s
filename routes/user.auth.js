var express = require('express');
var router = express.Router();
const UserController = require('../controllers/user.auth');
const {restrictToUserLoginOnly,authenticateUser} = require('../middlewares/auth')
const validateSignup = require('../middlewares/signup.validation')
router.get('/signup',UserController.RenderSignup);
router.get('/login',UserController.RenderLogin);

router.post('/signup',validateSignup,UserController.Signup);
router.post('/login',UserController.Login);
router.post('/logout',UserController.logout)
router.delete('/deleteUser/:username',UserController.deleteUser);
router.get('/profile/:email', authenticateUser, UserController.GetProfile);
// Apply authentication middleware to protected routes
// router.get('/protected', authenticationToken, (req, res) => {
//   // Access user ID using req.userId
//   res.json({ message: 'Protected route accessed', userId: req.userId });
// });

module.exports = router;
