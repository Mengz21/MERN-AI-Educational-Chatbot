import { useEffect, useState } from "react";
import ChatList from "../components/ChatList";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
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
    <div className="home">
      {chats ? <ChatList chats={chats} /> : "Loading..."}
      <WorkoutForm />
    </div>
  );
};

export default Home;
