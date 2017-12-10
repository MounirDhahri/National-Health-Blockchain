var cors = require('cors')


var express = require("express");
var path = require("path");
var logger = require('morgan');

var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");

var config = require("../environments/development");

var routes = require("../../app/routes/index");
var users = require("../../app/routes/users");
var transactions = require("../../app/routes/transactions");
var documents = require("../../app/routes/documents");


var app = express();

app.use(cors());

// Connect to database
mongoose.connect(config.database.local, { useMongoClient: true });

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Init passport
app.use(passport.initialize());
require('./passport')(passport);

// Routes
app.use('/', routes);
app.use('/users', users);
app.use('/transactions', transactions);
app.use('/documents', documents);


/**
 * Error handlers
 */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {}
  });
});

module.exports = app;
