let express = require('express');
let router = express.Router();
let passport = require('passport');



// Example of required auth: protect dashboard route with JWT
router.post('/', function(req, res) {
  console.log(req.body);
  res.send({
    success:true,
  });
});


module.exports = router;
