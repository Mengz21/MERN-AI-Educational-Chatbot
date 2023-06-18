import { BrowserRouter, Routes, Route} from 'react-router-dom'

// chatgpt imports 
import React from 'react';
import { Switch } from 'react-router-dom';

// pages & components 
import Home from './pages/Home'
import ChatbotPage from './pages/Chatbot'; // Import the chatbot page component

//import Navbar from './components/Navbar'
import Navbar from './components/Navbar'

// first one: home (react) component being rendered for the root path 
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>  
            <Route 
              path="/"
              element={ <Home />}
            />
            <Route 
              path="/chatbot" 
              element={<ChatbotPage />} /> 
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;



 

