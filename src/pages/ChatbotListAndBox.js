import { useEffect, useState } from "react";
import ChatList from "../components/ChatList";
import ChatBox from "../components/ChatBox";

const Chatbot = () => {
  const [chats, setChats] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      const response = await fetch('/api/chatbot');
      const json = await response.json();

      if (response.ok) {
        setChats(json.chats);
      }
    };

    fetchChats();
  }, []);

  return (
    <div className="chat-page">
      {chats ? <ChatList chats={chats} /> : "Loading..."}
      <ChatBox />
    </div>
  );
};

export default Chatbot;
