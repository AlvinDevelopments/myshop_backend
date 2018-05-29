var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description:String,
  category: String,
  brand: String,
  gender: String,
  description: String,
  size: String,
  user: String,
});

var Item = mongoose.model('items',itemSchema);
module.exports = Item;
