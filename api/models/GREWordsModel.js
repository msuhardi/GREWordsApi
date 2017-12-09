'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var GroupSchema = new Schema({
  name: {type: String, required: true}
});

var WordSchema = new Schema({
  word: {type: String, required: true},
  human_name: {type: String, required: true},
  meaning: {type: String, required: true},
  example: {type: String, required: true},
  mnemonic: Schema.Types.Mixed,
  sound_url: String,
});

var WordGroupSchema = new Schema({
  word: {type: Schema.Types.ObjectId, ref: 'Word'},
  group: {type: Schema.Types.ObjectId, ref: 'Group'},
  added_date: {type: Date, default: Date.now},
});

var UserSchema = new Schema({
  last_name: {type: String, required: true},
  first_name: {type: String, required: true},
  email: {type: String, required: true},
  username: {type: String, required: true},
  password: {type: String, required: true},
  sex: {type: String},
});

var UserWordGroupSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  group: {type: Schema.Types.ObjectId, ref: 'Group'},
  words: [{type: Schema.Types.ObjectId, ref: 'Word'}],
  last_studied_date: {type: Date, default: Date.now},
});

module.exports = {
  WordGroup: mongoose.model('Group', GroupSchema, 'groups'),
  Word: mongoose.model('Word', WordSchema, 'words'),
  WordGroup: mongoose.model('WordGroup', WordGroupSchema, 'word_groups'),
  User: mongoose.model('User', UserSchema, 'users'),
  UserWordGroup: mongoose.model('UserWordGroup', UserWordGroupSchema, 'user_word_group'),
}
