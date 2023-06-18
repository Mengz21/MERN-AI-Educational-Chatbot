const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);




// Controller function to process chat message
const processChatMessage = async (req, res) => {
    const { message } = req.body;
  
    try {
      // Call the CustomChatGPT function to get the chatbot's reply
      const chatbotReply = await CustomChatGPT(message);
  
      // Send the chatbot reply as the API response
      res.json({ message: chatbotReply });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while processing the chat message.' });
    }
  };
  
  const messages = [
    { role: 'system', content: 'You are a psychologist that specializes in giving advice to situations with philosophical quotes' }
  ];
  
async function CustomChatGPT(user_input) {
    messages.push({ role: 'user', content: user_input });
  
    try {
      const completionRequest = {
        model: 'gpt-3.5-turbo',
        messages: messages
      };
  
      const response = await openai.createChatCompletion(completionRequest);
      const ChatGPT_reply = response.data.choices[0].message.content;
  
      messages.push({ role: 'assistant', content: ChatGPT_reply });
  
      return ChatGPT_reply;
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while processing the chat message.');
    }
  }

module.exports = { processChatMessage };
