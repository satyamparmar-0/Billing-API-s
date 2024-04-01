var express = require('express');
var router = express.Router();
const UserController = require('../controllers/user');
//const authenticationToken = require('../middlewares/auth');



/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/signup',UserController.RenderSignup);
router.get('/login',UserController.RenderLogin);

router.post('/signup',UserController.Signup);
router.post('/login',UserController.Login);
// Apply authentication middleware to protected routes
// router.get('/protected', authenticationToken, (req, res) => {
//   // Access user ID using req.userId
//   res.json({ message: 'Protected route accessed', userId: req.userId });
// });

module.exports = router;
