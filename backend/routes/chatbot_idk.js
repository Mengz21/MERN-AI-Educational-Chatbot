const express = require('express');
const router = express.Router();

// Import chatbot controller functions
const {
  processChatMessage,
  startNewChat,
  deleteChat,
  getChatById,
  getAllChats
} = require('../controllers/chatbotController');

// Handle POST request to '/api/chatbot'
router.post('/', processChatMessage);

// Handle POST request to '/api/chatbot/start'
router.post('/start', startNewChat);

// Handle DELETE request to '/api/chatbot/:id'
router.delete('/:id', deleteChat);

// Handle GET request to '/api/chatbot/:id'
router.get('/:id', getChatById);

// Handle GET request to '/api/chatbot'
router.get('/', getAllChats);

module.exports = router;
