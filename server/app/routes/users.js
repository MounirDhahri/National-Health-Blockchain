let express = require('express');
let router = express.Router();
let passport = require('passport');
let jwt = require('jsonwebtoken');
let User = require('../models/User');

// let multer = require("multer");
// let upload = multer({dest:"public/images"})

let config = require('../../config/environments/development');

// Register new users
router.post('/register', function(req, res) {
  if (!req.body.email || !req.body.password || !req.body.firstname || !req.body.lastname || !req.body.birthday  || !req.body.country) {
    res.json({
      success: false,
      message: 'Please fill in all the required fields.'
    });
  } else {
    let newUser = new User({
      email: req.body.email,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      birthday: req.body.birthday,
      country: req.body.country
    });

    // Attempt to save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({
          success: false,
          message: 'Mail address already in use'
        });
      }
      res.json({
        success: true,
        message: 'Successfully created a new user.'
      });
    });
  }
});


//List of users
router.get('/', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});


// Authenticate the user and get a JSON Web Token to include in the header of future requests.
router.post('/auth', (req, res) => {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.send({
        success: false,
        message: 'Authentication failed. User not found.'
      });
    } else {
      // Check if password matches
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (isMatch && !err) {
          // Create token if the password matched and no error was thrown
          let token = jwt.sign(user, config.auth.secret, {
            expiresIn: "2 days"
          });
          res.json({
            success: true,
            message: 'Authentication successfull',
            token
          });
        } else {
          res.send({
            success: false,
            message: 'Authentication failed. Passwords did not match.'
          });
        }
      });
    }
  });
});



// Example of required auth: protect dashboard route with JWT
router.get('/dashboard', passport.authenticate('jwt', {
  session: false
}), function(req, res) {
  res.send('It worked! User id is: ' + req.user._id + '.');
});


module.exports = router;
