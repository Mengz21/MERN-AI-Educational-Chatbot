// problem: every message = new conversation with the entire history 
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

// Remove the initialMessages assignment from the top-level scope
let messages = [];


// Controller function to process chat message
// const { message, title, conversationId } = req.body; // Assuming conversationId is passed in the request body
  //const { message, title } = req.body;
    //const { chatId } = req.params;
    //const { message, title, chatId } = req.body;

    //new chatMEssage

// after this think I'll try to use new chatMessage  
const processChatMessage = async (req, res) => {
    console.log('Request Body:', req.body);
  
    const { message, chatId } = req.body;
  
    console.log('Chat ID:', chatId);
    try {
      let chatConversation;
      console.log('Chat ID:', chatId);
  
      if (chatId) {
        chatConversation = await ChatConversation.findById(chatId);
      } else {
        messages = [...initialMessages];
      }
  
      const { chatbotReply, updatedMessages } = await CustomChatGPT(message);
  
      let updatedConversation;
      if (chatConversation) {
        chatConversation.messages.push(...updatedMessages);
        updatedConversation = chatConversation.messages;
      } else {
        updatedConversation = updatedMessages;
      }
  
      console.log('Updated Conversation:', updatedConversation);
  
      if (chatConversation) {
        await ChatConversation.findByIdAndUpdate(chatId, { messages: updatedConversation });
      } else {
        chatConversation = new ChatConversation({ messages: updatedConversation });
        await chatConversation.save();
      }
  
      let chatbotResponse = '';
      for (let i = updatedMessages.length - 1; i >= 0; i--) {
        if (updatedMessages[i].role === 'system') {
          chatbotResponse = updatedMessages[i].content;
          break;
        }
      }
      console.log('resJson chatHistory: chatConversation.messages: ', chatConversation.messages);
  
      res.json({ message: chatbotResponse, chatHistory: updatedConversation });
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
    const { id } = req.params;
    try {
      const chat = await ChatConversation.findById(id);
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
  };

  const startNewChat = async (req, res) => {
    try {
      let initial_messages = [...initialMessages]; // Reset the messages array
  
      // Create a new chat conversation and save the messages in it

      
      const conversation = new ChatConversation({ messages: initial_messages });
      await conversation.save();
  
      res.json({ message: 'New chat session started' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while starting a new chat session.' });
    }
  };
  

module.exports = { processChatMessage, deleteChat, getChatById, getAllChats, startNewChat };