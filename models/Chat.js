var mongoose = require('mongoose');

var ChatSchema = new mongoose.Schema({
  name: String,
  create: {
    type: Date,
    default: Date.now
  },
  messages: [{
    message: String,
    username: String,
    star: {
      type: Boolean,
      default: false
    },
    time: {
      type: Date,
      default: Date.now
    }
  }]
});

module.exports = mongoose.model('Chat', ChatSchema);