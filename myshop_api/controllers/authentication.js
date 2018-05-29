var passport = require('passport');
var mongoose = require('mongoose');
// var User = mongoose.model('User');
var User = require('../models/User');

module.exports.register = function(req, res) {
  console.log('signing up');
  var user = new User();
  console.log(req.body);
  user.firstname = req.body.firstname;
  user.lastname = req.body.lastname;
  user.email = req.body.email;
  user.username = req.body.username;

  if(req.body.password!==req.body.passwordretype){
    res.status(401).json({message:'passwords do not match'});
    return;
  }

  user.setPassword(req.body.password);

  user.save(function(err) {

    if(err){
      console.log(err);
    }
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token" : token
    });
  });
};


module.exports.login = function(req, res) {

  passport.authenticate('local', function(err, user, info){
    // console.log(info);
    var token;
    // If Passport throws/catches an error
    if (err) {
      console.log('error');
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      console.log('user found');
      token = user.generateJwt();
      res.status(200);
      res.send({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(500).json(info);
    }
  })(req, res);

};


module.exports.checkAuth = function(req,res){
  // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError"
    });
  } else {
    // Otherwise continue
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200);
      });
  }
};
