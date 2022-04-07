// libraries
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import jsCookie from "js-cookie";

// components
import Navbar from "./components/Navbar/Navbar";
import Profile from "./pages/Profile/Profile";
import AddActivity from './pages/AddActivity/AddActivity';
import History from './pages/History/History';
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";

//
import { getHistories } from "./connecter/user";

import './App.css';

function App() {

  const [ isLogin, setIsLogin ] = useState(false);
  const [ id, setId ] = useState();
  const [ session, setSession ] = useState();

  const [ isMobile, setIsMobile ] = useState(false);
  const [ screenWidth, setScreenWidth ] = useState(700);

  // example data
  const [ histories, setHistories ] = useState([]);

  const navigate = useNavigate();

  const handdleLogout = () => {
    setIsLogin(false);
    setId();
    setSession();
    jsCookie.remove('id');
    jsCookie.remove('session');
    setHistories([]);
  }

  const loadHistories = async (page=0) => {
    const getHistoriesRes =  await getHistories(id, session, page);
    if(getHistoriesRes.error){
      setHistories([]);
    } else {
      setHistories(getHistoriesRes);
    }
    console.log(getHistoriesRes);
  }

  // get login when start
  useEffect(() => {
    const cookieId = jsCookie.get('id');
    const cookieSession = jsCookie.get('session');
    if(cookieId && cookieSession){
      setIsLogin(true);
      setId(cookieId);
      setSession(cookieSession);
    }
  }, []);

  useEffect(() => {
    if(id && session){
      jsCookie.set('id', id);
      jsCookie.set('session', session);
      setIsLogin(true);
      loadHistories();
    }
    navigate('/', {replace: true});
  }, [session]);

  // handdle resize
  useEffect(() => {
      function handleResize() {
        setScreenWidth(window.innerWidth);
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
  }, []);

  // update screen width
  useEffect(() => {
    if(isMobile && screenWidth > 700){
      setIsMobile(false);
    } else if(!isMobile && screenWidth <= 700){
      setIsMobile(true);
    }
  }, [screenWidth]);

  

  return (
    <div className="App">
      <div className='nav-div'>
        <Navbar isLogin={isLogin} handdleLogout={handdleLogout}/>
      </div>
        <Routes>
          <Route path="" element={<Profile />} />
          <Route path="/add-activity" element={<AddActivity isMobile={isMobile} setHistories={setHistories} />} />
          <Route path="/history" element={<History isLogin={isLogin} isMobile={isMobile} histories={histories} />} />
          <Route path="/register" element={<Register isLogin={isLogin}/>} />
          <Route path="/login" element={<Login isLogin={isLogin} setId={setId} setSession={setSession} />} />
        </Routes>
    </div>
  );
}

export default App;
