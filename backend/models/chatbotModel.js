const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const chatConversationSchema = new mongoose.Schema({
  title: {
    type: String,
    default: 'Untitled',
  },
  messages: [chatMessageSchema],
}, { timestamps: true });

const ChatConversation = mongoose.model('ChatConversation', chatConversationSchema);

module.exports = ChatConversation;
