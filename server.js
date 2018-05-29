const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;

var router = require('./myshop_api/controllers/router');

var passport = require('passport');
require('./myshop_api/config/passport');



mongoose.connect('mongodb://alvnl:123yo@ds121730.mlab.com:21730/myshop');

const Comment = mongoose.model('Comment',{name:String, term: String});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());

app.use('/',router);

// error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});




app.listen(port, () => console.log(`Listening on port ${port}`));
