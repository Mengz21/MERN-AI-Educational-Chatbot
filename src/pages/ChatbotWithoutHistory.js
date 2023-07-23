import React, { useState } from 'react';

const Chatbot = () => {
  const [userInput, setUserInput] = useState('');
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
      setChatbotResponse(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {chatbotResponse && (
          <div className="chatbot-message chatbot-response">{chatbotResponse}</div>
        )}
      </div>
      <div className="chatbot-input">
        <input type="text" value={userInput} onChange={handleUserInput} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
