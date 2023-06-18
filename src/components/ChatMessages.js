import React from 'react';

const ChatMessages = ({ chatHistory, chatbotResponse }) => {
  return (
    <div className="chatbot-messages">
      {chatHistory.map((message, index) => (
        <div key={index} className={`chatbot-message ${message.role}`}>
          {message.content}
        </div>
      ))}
    
    </div>
  );
};

export default ChatMessages;
