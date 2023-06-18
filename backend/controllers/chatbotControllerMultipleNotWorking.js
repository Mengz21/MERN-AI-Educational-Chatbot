const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();
const ChatConversation = require('../models/chatbotModel');

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);

const messages = [
  { role: 'system', content: 'You are a psychologist that specializes in giving advice to situations with philosophical quotes' }
];

// Controller function to process chat message
const processChatMessage = async (req, res) => {
  const { message } = req.body;

  try {
    // Call the CustomChatGPT function to get the chatbot's reply
    const { chatbotReply, updatedMessages } = await CustomChatGPT(message);

    // Create a new chat conversation document and store the updatedMessages in the database
    const conversation = new ChatConversation({
      messages: updatedMessages
    });
    await conversation.save();

    // Send the chatbot reply and updated chat history as the API response
    res.json({ message: chatbotReply, chatHistory: updatedMessages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the chat message.' });
  }
};

async function CustomChatGPT(user_input) {
  const localMessages = [
    ...messages,
    { role: 'user', content: user_input }
  ];

  try {
    const completionRequest = {
      model: 'gpt-3.5-turbo',
      messages: localMessages
    };

    const response = await openai.createChatCompletion(completionRequest);
    const chatbotReply = response.data.choices[0].message.content;

    return { chatbotReply, updatedMessages: localMessages };
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while processing the chat message.');
  }
}

module.exports = { processChatMessage };
