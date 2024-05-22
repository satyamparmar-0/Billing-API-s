var express = require('express');
var router = express.Router();
const UserController = require('../controllers/user');
const {restrictToUserLoginOnly} = require('../middlewares/auth')

router.get('/signup',UserController.RenderSignup);
router.get('/login',UserController.RenderLogin);

router.post('/signup',UserController.Signup);
router.post('/login',UserController.Login);
router.post('/logout',UserController.logout)
router.get('/getProfile/:username',restrictToUserLoginOnly,UserController.GetProfile);
router.delete('/deleteUser/:username',UserController.deleteUser);
// Apply authentication middleware to protected routes
// router.get('/protected', authenticationToken, (req, res) => {
//   // Access user ID using req.userId
//   res.json({ message: 'Protected route accessed', userId: req.userId });
// });

module.exports = router;
