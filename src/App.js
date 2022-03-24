import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';

import Navbar from "./components/Navbar/Navbar";
import AddActivity from './pages/AddActivity/AddActivity';
import History from './pages/History/History';

import './App.css';

function App() {

  const [ isMobile, setIsMobile ] = useState(false);
  const [ screenWidth, setScreenWidth ] = useState(700);

  useEffect(() => {
      function handleResize() {
        setScreenWidth(window.innerWidth);
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if(isMobile && screenWidth > 700){
      setIsMobile(false);
    } else if(!isMobile && screenWidth <= 700){
      setIsMobile(true);
    }
  }, [screenWidth]);

  const [ histories, setHistories ] = useState([
    {
        type: 'run',
        name: 'วิ่ง',
        description: 'วิ่งในสวน',
        date: '14/02/2022',
        duration: 50
    },
    {
        type: 'run',
        name: 'วิ่งเร็ว',
        description: 'วิ่งในสวน',
        date: '14/02/2022',
        duration: 3800
    },
    {
        type: 'run',
        name: 'วิ่งเร้วเร็ว',
        description: 'วิ่งในสวน',
        date: '14/02/2022',
        duration: 5000
    }
  ]);

  return (
    <div className="App">
      <BrowserRouter>
      <div className='nav-div'>
        <Navbar />
      </div>
        <Routes>
          <Route path="/" element={<History isMobile={isMobile} histories={histories} />} />
          <Route path="/add-activity" element={<AddActivity isMobile={isMobile} setHistories={setHistories} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
