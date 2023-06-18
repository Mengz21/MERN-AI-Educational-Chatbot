import React from 'react';
import ChatDetails from './ChatDetails';

const ChatList = ({ chats }) => {
  if (!chats) {
    return null; // or render a loading state if desired
  }

  return (
    <div className="chats">
      {chats.map((chat) => (
        <ChatDetails key={chat._id} chat={chat} />
      ))}
    </div>
  );
};

export default ChatList;
