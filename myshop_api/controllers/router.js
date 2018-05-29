const mongoose = require('mongoose');
const express = require('express');
const Item = require('../models/Item');
const User = require('../models/User');
const app = express.Router();
const authentication = require('./authentication');
var jwt = require('express-jwt');

const profile = require('./profile');
const upload = require('./upload');

var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload',
});


// login route
app.post('/api/login', authentication.login);

// register route
app.post('/api/register', authentication.register);

// show profile
app.get('/api/profile', auth, profile.profileRead);

// post items
app.post('/api/postitem', auth, upload.upload);

//check author
app.get('/api/checkauth',auth,authentication.checkAuth);

app.get('/search',(req,res)=>{

  // console.log('search executed');
  // console.log(req.query);
  let query = Item.find({name:{"$regex":req.query.query,"$options":"i"}});
  // let query = Item.find({name:{"$regex":"coffee","$options":"i"}});
  // let query = Item.find({gender: 'F'});
  query.select('name user price brand gender description size');
  query.exec(function(err,items){
    if(err){
      // res.render('index',{
      //   msg: err
      // });
    }
    else{
      // console.log(posts);
      res.send(items);
    }
  });
});

app.get('/all',(req,res)=>{
  // console.log('lol');
  let query = Item.find();
  query.select('name user price brand gender description size');
  query.exec(function(err,items){
    if(err){
      res.send({
        msg: err
      });
    }
    else{
      // console.log(posts);
      res.send(items);
    }
  });

});


















app.get('/mens',(req,res)=>{
  let query = Item.find({gender: 'M'});
  query.select('name price brand gender description size');
  query.exec(function(err,items){
    if(err){
      res.render('index',{
        msg: errs
      });
    }
    else{
      // console.log(posts);
      res.send(items);
    }
  });


});





app.get('/womens',(req,res)=>{

  let query = Item.find({gender: 'F'});
  query.select('name price brand gender description size');
  query.exec(function(err,items){
    if(err){
      res.render('index',{
        msg: err
      });
    }
    else{
      // console.log(posts);
      res.send(items);
    }
  });


});


app.get('/comments', (req, res) => {
  // console.log(req);
  Comment.find(function(err,comments){
    console.log(comments);
    if(err){
      return console.error(err);
    }
    return res.send(comments.reverse());
  });
});


module.exports = app;
