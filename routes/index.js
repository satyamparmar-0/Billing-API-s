var express = require('express');
var router = express.Router();
const User = require('../models/user')

/* GET home page. */
router.get('/profile', function(req, res, next) {
  // Ensure that the user is authenticated by checking req.user
  if (!req.user) {
    // Redirect to login if user is not authenticated
    return res.redirect('/login');
  }

  // Assuming your user model has a field like 'username' to find the user
  const username = req.user.username;

  // Find the user in the database based on the username
  User.findOne({ username })
    .then(user => {
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      res.render('profile', { user, title: 'Express' });
    })
    .catch(error => {
      // Handle any errors that occur during the database query
      console.error('Error fetching user:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    });
});

router.get('/menu', function(req, res, next) {
  // Your logic to fetch user information and render the template
  res.render('menu');
});


module.exports = router;
