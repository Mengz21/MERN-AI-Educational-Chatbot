const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();
const ChatConversation = require('../models/chatbotModel');

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);

const initialMessages = [
  { role: 'system', content: 'You are a psychologist that specializes in giving advice to situations with philosophical quotes' },
];

let messages = [...initialMessages];

// Controller function to process chat message
const processChatMessage = async (req, res) => {
    const { message } = req.body;
  
    try {
      const { chatbotReply, updatedMessages } = await CustomChatGPT(message);
  
      // Update the messages array with the chat history
      messages = updatedMessages;
  
      // Save the chat history in the database
      const conversation = new ChatConversation({
        messages: updatedMessages,
      });
      await conversation.save();
      // Find the last system message in the message array
      let chatbotResponse = '';
      for (let i = updatedMessages.length - 1; i >= 0; i--) {
        if (updatedMessages[i].role === 'system') {
          chatbotResponse = updatedMessages[i].content;
          break;
        }
      }
  
      // Send the chatbot reply and updated chat history as the API response
      res.json({ message: chatbotResponse, chatHistory: updatedMessages });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while processing the chat message.' });
    }
  };
  

// Function to delete a chat by ID
const deleteChat = async (req, res) => {
  const { chatId } = req.params;
  try {
    await ChatConversation.findByIdAndRemove(chatId);
    res.json({ message: 'Chat deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the chat.' });
  }
};

// Function to get a chat by ID
const getChatById = async (req, res) => {
  const { chatId } = req.params;
  try {
    const chat = await ChatConversation.findById(chatId);
    if (!chat) {
      res.status(404).json({ error: 'Chat not found' });
    } else {
      res.json({ chat });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving the chat.' });
  }
};

// Function to get all chats
const getAllChats = async (req, res) => {
  try {
    const chats = await ChatConversation.find({}).sort({ createdAt: -1 });
    res.json({ chats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving the chats.' });
  }
};

async function CustomChatGPT(user_input) {
    const localMessages = [
      ...messages,
      { role: 'user', content: user_input },
    ];
  
    try {
      const completionRequest = {
        model: 'gpt-3.5-turbo',
        messages: localMessages,
      };
  
      const response = await openai.createChatCompletion(completionRequest);
      const chatbotReply = response.data.choices[0].message.content;
  
      // Append a new message for the chatbot's reply
      const updatedMessages = [
        ...localMessages,
        { role: 'system', content: chatbotReply },
      ];
  
      return { chatbotReply, updatedMessages };
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while processing the chat message.');
    }
  }
  
  

const startNewChat = async (req, res) => {
  try {
    messages = [...initialMessages]; // Reset the messages array
    res.json({ message: 'New chat session started' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while starting a new chat session.' });
  }
};

module.exports = { processChatMessage, deleteChat, getChatById, getAllChats, startNewChat };
