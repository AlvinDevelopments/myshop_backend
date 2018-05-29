const mongoose = require('mongoose');
const express = require('express');
const Item = require('../models/Item');
const User = require('../models/User');
const app = express.Router();
const authentication = require('./authentication');
var jwt = require('express-jwt');

const profile = require('./profile');

module.exports.upload = function(req,res){

  console.log(req.payload._id);
  const postItem = new Item({
    name:req.body.postname,
    price:req.body.price,
    description:req.body.description,
    category:req.body.category,
    user: req.payload._id}

  );

  console.log(postItem);

  postItem.save().then(()=>console.log('posted up!!!!'));
  res.send('success');
};
