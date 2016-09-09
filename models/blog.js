//mongodb schema for blog
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogSchema = new Schema({
  title: String,
  content: String,
  created: { type: Date, default: Date.now },
  updated: Date,
  owner: Boolean
})

module.exports = mongoose.model('Blog', BlogSchema);
