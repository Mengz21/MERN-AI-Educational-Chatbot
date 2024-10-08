const express = require('express');
const router = express.Router();

// Import the chatbot controller functions
const {
  processChatMessage,
  startNewChat,
  deleteChat,
  getChatById,
  getAllChats,
  updateTitle
} = require('../controllers/chatbotController');



// Handle POST request to start a new chat
router.post('/start', startNewChat);
// Handle POST request to send a message
router.post('/', processChatMessage);
//router.post('/', getAllChats);
router.post('/:id/title', updateTitle);

// Handle POST request to send a message to a specific chat by ID
router.post('/:id', processChatMessage);

// Handle DELETE request to delete a chat by ID
router.delete('/:id', deleteChat);

// Handle GET request to get a chat by ID /api/chatbot/:id
router.get('/:id', getChatById);

// Handle GET request to get all chats
router.get('/', getAllChats);

module.exports = router;
