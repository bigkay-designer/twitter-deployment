const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const messages = new Schema({
  message: String,
  name: String,
  time: String,
  // currentDay: String,
});

module.exports = mongoose.model('messages', messages);
