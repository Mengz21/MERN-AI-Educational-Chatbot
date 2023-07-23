

import React, { useState } from 'react';
import ChatMessages from '../components/ChatMessages';

const Chatbot = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [chatbotResponse, setChatbotResponse] = useState('');

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const sendMessage = async () => {
    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      });
      const data = await response.json();
      console.log(data); // Add this line to log the data
      setChatbotResponse(data.message);
      setChatHistory(data.chatHistory);
    } catch (error) {
      console.error(error);
    }
  };
  

  const startNewChat = async () => {
    try {
      const response = await fetch('/api/chatbot/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setChatbotResponse('');
      setChatHistory([]);
      setUserInput('');
      console.log(data.message); // Log the message returned from the server
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="chatbot-container">
      <ChatMessages chatHistory={chatHistory} chatbotResponse={chatbotResponse} />
      <div className="chatbot-input">
        <input type="text" value={userInput} onChange={handleUserInput} />
        <button onClick={sendMessage}>Send</button>
        <button onClick={startNewChat}>Start New Chat</button> {/* Add the Start New Chat button */}
      </div>
    </div>
  );
};

export default Chatbot;