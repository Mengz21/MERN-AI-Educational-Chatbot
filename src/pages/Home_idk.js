import React, { useEffect, useState } from "react";
import ChatList from "../components/ChatList";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  const [chats, setChats] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch('/api/chatbot');
        const json = await response.json();

        if (response.ok) {
          setChats(json.chats);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchChats();
  }, []);

  const loadConversation = async (chatId) => {
    try {
      const response = await fetch(`/api/chatbot/${chatId}`);
      const data = await response.json();

      if (response.ok) {
        console.log('Loading conversation:', chatId);
        // Do something with the loaded conversation if needed
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="home">
      {chats ? <ChatList chats={chats} loadConversation={loadConversation} /> : "Loading..."}
      <WorkoutForm />
    </div>
  );
};

export default Home;
