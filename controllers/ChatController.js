var mongoose = require("mongoose");
var Chat = require("../models/Chat");

var chatController = {};

// Get the all the Chat information.
chatController.getAllChatInfo = function (req, res) {
  Chat.find({}).exec(function (err, chats) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.send(chats);
    }
  });
};

//Get the Chat information by chat id.
chatController.getChatInfoById = function (req, res) {
  Chat.findOne({
    _id: req.params.id
  }).exec(function (err, chat) {
    if (err) {
      res.send(err);
    } else {
      res.send(chat);
    }
  });
};

// create new chat group
chatController.createNewChat = function (req, res) {

  if (!req.body.name) {
    res.send({
      message: "Field:name is missing in the body."
    });
  } else {
    var chat = new Chat(req.body);
    chat.save(function (err) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        var id = chat._id.toString()
        res.send({
          message: "Successfully created a new chat group",
          "chat id": id
        });
      }
    });
  }
};

// Add message to the chat group
chatController.addMessage = function (req, res) {

  if (!req.body.message || !req.body.username) {
    res.send({
      message: "message or username is missing in the body."
    })
  } else {
    Chat.findByIdAndUpdate(
      req.params.id, {
        $push: {
          "messages": {
            message: req.body.message,
            username: req.body.username
          }
        }
      }, {
        safe: true,
        upsert: true
      },
      function (err, model) {
        if (err) {
          res.send(err);
        } else {
          res.send(model);
        }
      }
    );
  }
};

// Add or remove the star on the comment
chatController.star = function (req, res) {
  if (!req.params.id) {
    res.send({
      message: "chat id is required in the query params"
    })
  } else {
    Chat.update({
      _id: req.params.id,
      'messages._id': req.body.message_id
    }, {
      '$set': {
        'messages.$.star': req.body.star
      }
    }, function (err) {
      if (err) {
        res.send(err);
      } else {
        res.send({
          message: "updated successfully"
        })
      }
    })
  }
};

// Edit Message.
chatController.editMessage = function (req, res) {

  if (!req.params.id || !req.body.message) {
    res.send({
      message: "Missing fields in the request."
    })
  } else {
    Chat.update({
      _id: req.params.id,
      'messages._id': req.body.message_id
    }, {
      '$set': {
        'messages.$.message': req.body.message
      }
    }, function (err) {
      if (err) {
        res.send(err);
      } else {
        res.send({
          message: "updated successfully"
        })
      }
    })
  }
};

// Delete the message from chat using chatid and message id.
chatController.deleteMessage = function (req, res) {

  if (!req.params.id || !req.body.message_id) {
    res.send({
      message: "Missing fields in the request."
    })
  } else {
    Chat.update({
        _id: req.params.id
      }, {
        $pull: {
          "messages": {
            _id: req.body.message_id
          }
        }
      },
      function (err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send({
            message: "Message has been deleted!!!"
          })
        }
      }
    );
  }
};

module.exports = chatController;