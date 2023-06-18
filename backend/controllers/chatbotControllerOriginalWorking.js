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
    // Define the OpenAI chat completion request
    const completionRequest = {
      model: 'gpt-3.5-turbo', // The OpenAI model to use
      messages: [
        { role: 'system', content: 'You are a helpful chatbot.' },
        { role: 'user', content: message },
      ],
    };

    // Make the API request to OpenAI
    const response = await openai.createChatCompletion(completionRequest);
    console.log('Response after API request:', response);

    // Extract the chatbot's reply from the response
    const chatbotReply = response.data.choices[0].message.content;

    // Send the chatbot reply as the API response
    res.json({ message: chatbotReply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the chat message.' });
  }
};

module.exports = { processChatMessage };
