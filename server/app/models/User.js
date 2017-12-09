let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let Schema = mongoose.Schema;
let validate = require('mongoose-validator');

let stringValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 50],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
  }),
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: false,
    message: 'Name should contain alpha-numeric characters only'
  })
];


// Schema defines how the user data will be stored in MongoDB
let UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true,
    validate: stringValidator
  },
  lastname: {
    type: String,
    required: true,
    validate: stringValidator
  },
  birthday: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true,
    validate: stringValidator
  },
  diaries: {
    type: Array,
    default: []
  }
});

// Hash the user's password before inserting a new user
UserSchema.pre('save', function(next) {
  let user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

// Compare password input to password saved in database
UserSchema.methods.comparePassword = function(pw, cb) {
  bcrypt.compare(pw, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

// Export the model
module.exports = mongoose.model('User', UserSchema);
