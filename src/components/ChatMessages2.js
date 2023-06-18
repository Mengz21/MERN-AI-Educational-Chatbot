import React from 'react';

const ChatMessages = ({ chatHistory, chatbotResponse }) => {
  return (
    <div className="chatbot-messages">
      {/* Loop through the chatHistory array and display each message */}
      {chatHistory.map((message, index) => (
        <div key={index} className={`chatbot-message ${message.role}`}>
          {message.content}
        </div>
      ))}
      {/* Display the chatbot response if it exists */}
      {chatbotResponse && (
        <div className="chatbot-message chatbot-response">{chatbotResponse}</div>
      )}
    </div>
  );
};

export default ChatMessages;
