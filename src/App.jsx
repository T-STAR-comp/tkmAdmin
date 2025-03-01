import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Import components
import Home from './HOME/home.jsx';
import TicketScanner from './SCANNER/main.jsx';
import Login from './Login/login.jsx';

function App() {
  const [resp, setResp] = useState(null);

   // Check window size
   const width = window.innerWidth;
   const height = window.innerHeight;
   const valid = width > 900 && height > 500;



   if (!sessionStorage.getItem('Logged')) {
    return (
      <>
        <Routes>
          <Route path='/' element={<Login />} />
        </Routes>
      </>
    );
   }

   if(sessionStorage.getItem("Logged")){
    
    if(valid){
      return (
        <>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </>
      );
    }

    if(!valid || sessionStorage.getItem('CamActive')){
      return (
        <>
          <Routes>
            <Route path='/' element={<TicketScanner />} />
          </Routes>
        </>
      );
    }
   };


};

export default App;
