import React, { useState, useEffect } from 'react';

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
      setChatbotResponse(data.message);
      setChatHistory(data.chatHistory);
      setUserInput('');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const scrollToBottom = () => {
      const chatContainer = document.querySelector('.chatbot-messages');
      chatContainer.scrollTop = chatContainer.scrollHeight;
    };
    scrollToBottom();
  }, [chatHistory]);

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {chatHistory.map((message, index) => (
          <div key={index} className={`chatbot-message ${message.role}`}>
            {message.content}
          </div>
        ))}
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
