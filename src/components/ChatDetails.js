import React from 'react';

const ChatDetails = ({ chat, onClick }) => {
  const { _id, updatedAt, messages } = chat;
  const lastMessage = messages[messages.length - 1];
  const words = lastMessage.content.split(' ').slice(0, 4).join(' ');

  return (
    <div className="chat-wrapper" onClick={() => onClick(_id)}>
      <div className="chat-details">
        <h4>{_id}</h4>
        <p><strong>Last Modified: </strong>{updatedAt}</p>
        <p><strong>Last Message: </strong>{words}</p>
      </div>
    </div>
  );
};

export default ChatDetails;
