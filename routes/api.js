var express = require('express');
var router = express.Router();
var chat = require("../controllers/ChatController.js");

// Get all the chat information
router.get('/chat', function(req, res) {
  chat.getAllChatInfo(req, res);
});

//Get chat information by id.
router.get('/chat/:id', function(req, res) {
  chat.getChatInfoById(req, res);
});

// Create new chat group
router.post('/createNewChat', function(req, res) {
  chat.createNewChat(req, res);
});

// Add message to the chat group.
router.post('/addMessage/:id', function(req, res) {
  chat.addMessage(req, res);
});

// Add or Remove Star from the messages
router.put('/message/star/:id', function(req, res) {
  chat.star(req, res);
});

// Edit the chat messages
router.put('/message/edit/:id', function(req, res) {
  chat.editMessage(req, res);
});

// Delete the message
router.delete('/message/delete/:id', function(req, res, next) {
  chat.deleteMessage(req, res);
});

module.exports = router;
