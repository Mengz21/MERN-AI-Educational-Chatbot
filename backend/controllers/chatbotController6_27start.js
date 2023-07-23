// problem: every message = new conversation with the entire history 
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();
const ChatConversation = require('../models/chatbotModel');

const configuration = new Configuration({
 apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);

const initialMessages = [
 { role: 'system', content: 'You are a personal tutor that specializes in guiding students in discovering their interests and learning more about them. You provide guiding questions when necessary and provide resources and encouragements occasionaly.' },
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
   // console.log('Request Body:', req.body);
  
    const { message } = req.body;
    const { id: chatId } = req.params;
    //console.log('Request :', req.body);

  
    console.log('processChatMessage Chat ID:', chatId);
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
// res.json({ chatTitle: chat.chatTitle, chatHistory: chat.messages  });

const getChatById = async (req, res) => {
    const { id } = req.params;
    console.log('Received ID by getChatByID:', id); // Log the received ID

    try {
      const chat = await ChatConversation.findById(id);

      if (!chat) {
        res.status(404).json({ error: 'Chat not found' });
      } else {
        console.log('Chat obtained by findById:', chat);
        res.json({ chatTitle: chat.title, chatHistory: chat.messages  });
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
   //console.log('All chats:', chats);
   res.json({ chats });
 } catch (error) {
   console.error(error);
   res.status(500).json({ error: 'An error occurred while retrieving the chats.' });
 }
};

//      
//      res.json({ chatTitle: chatConversation.title, chatHistory: chatConversation.messages  });


const startNewChat = async (req, res) => {
    try {
      console.log('initialMEssages:', initialMessages);

      const chatConversation = new ChatConversation({ messages: [...initialMessages] });      await chatConversation.save();
      res.json({ chat: chatConversation });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while starting a new chat.' });
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
  
      // Append a new message for the chatbot's reply with the role "system"
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
  

  const updateTitle = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    console.log('Received ID by updateTitle:', id); 

    try {
      const chat = await ChatConversation.findById(id);
      chat.title = title;
      await chat.save();
  
      res.json({ chatTitle: chat.title });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update chat title' });
    }
  };

module.exports = { processChatMessage, deleteChat, getChatById, getAllChats, startNewChat,updateTitle };