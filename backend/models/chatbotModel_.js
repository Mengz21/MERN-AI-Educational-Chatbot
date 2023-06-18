const mongoose = require('mongoose');

// Define the chat message schema
const chatMessageSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

// Define the chat conversation schema
const chatConversationSchema = new mongoose.Schema({
  messages: [chatMessageSchema]
});
//, { timestamps: true }

// Create the chat conversation model
const ChatConversation = mongoose.model('ChatConversation', chatConversationSchema);

module.exports = ChatConversation;