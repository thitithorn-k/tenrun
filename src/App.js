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
import { getActivities, verifyUser } from "./connecter/connecter.js";

import './App.css';

function App() {

  const [ isLogin, setIsLogin ] = useState(false);
  const [ id, setId ] = useState();
  const [ token, setToken ] = useState();
  const [ user, setUser ] = useState('');

  const [ isMobile, setIsMobile ] = useState(false);
  const [ screenWidth, setScreenWidth ] = useState(700);

  const [ activities, setActivities ] = useState([]);
  const [ activitiesCount, setActivitiesCount ] = useState(0);
  const [ pageNow, setPageNow ] = useState(0);
  const [ activitiesFilter, setActivitiesFilter ] = useState('');

  const [ activityToUpdate, setActivityToUpdate ] = useState();

  const navigate = useNavigate();

  const logoutUser = () => {
    setIsLogin(false);
    setId();
    setToken();
    jsCookie.remove('id');
    jsCookie.remove('token');
    jsCookie.remove('user');
    setActivities([]);
  }

  const loadActivities = async (page=0) => {
    if(id && token){
      if(page < 0) return;
      const getActivitiesRes =  await getActivities(id, token, page, activitiesFilter);
      if(getActivitiesRes.error){
        setActivities([]);
        if(getActivitiesRes.status === 403){
          logoutUser();
        }
      } else {
        setActivities(getActivitiesRes.data);
        setActivitiesCount(getActivitiesRes.count);
        setPageNow(page);
      }
    }
  }

  const verifyUserData = async () => {
    if(id && token){
      const res = await verifyUser(id, token);
      if(!res){
        logoutUser();
      }
    } else {
      logoutUser();
    }
  }

  // get login when start
  useEffect(() => {
    const cookieId = jsCookie.get('id');
    const cookieToken = jsCookie.get('token');
    const cookieUser = jsCookie.get('user');
    if(cookieId && cookieToken){
      setIsLogin(true);
      setId(cookieId);
      setToken(cookieToken);
      setUser(cookieUser);
    }
    // verifyUserData();
  }, []);

  // handdle resize
  useEffect(() => {
      function handleResize() {
        setScreenWidth(window.innerWidth);
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if(id && token){
      jsCookie.set('id', id);
      jsCookie.set('token', token);
      jsCookie.set('user', user);
      setIsLogin(true);
      loadActivities();
    }
    navigate('/', {replace: true});
  }, [token]);

  // update screen width
  useEffect(() => {
    if(isMobile && screenWidth > 700){
      setIsMobile(false);
    } else if(!isMobile && screenWidth <= 700){
      setIsMobile(true);
    }
  }, [screenWidth]);

  useEffect(() => {
    loadActivities();
  }, [activitiesFilter])
  

  return (
    <div className="App">
      <div className='nav-div'>
        <Navbar isLogin={isLogin} handdleLogout={logoutUser}/>
      </div>
        <Routes>
          <Route path="" element={
            <Profile 
              isLogin={isLogin} 
              loginData={{'id': id, 'token': token, 'user': user}}
            />
          } />
          <Route path="/add-activity" element={
            <AddActivity 
              setActivities={setActivities} 
              loginData={{'id': id, 'token': token}} 
              loadActivities={loadActivities} 
              activityToUpdate={activityToUpdate}
              setActivityToUpdate={setActivityToUpdate}
            />
          } />
          <Route path="/history" element={
            <History 
              isLogin={isLogin} 
              isMobile={isMobile} 
              activities={activities} 
              loginData={{'id': id, 'token': token}} 
              loadActivities={loadActivities} 
              activityToUpdate={activityToUpdate}
              setActivityToUpdate={setActivityToUpdate}
              pageNow={pageNow}
              activitiesCount={activitiesCount}
              activitiesFilter={activitiesFilter}
              setActivitiesFilter={setActivitiesFilter}
            />
          } />
          <Route path="/register" element={
            <Register isLogin={isLogin}
            />
          } />
          <Route path="/login" element={
            <Login 
              isLogin={isLogin} 
              setId={setId} 
              setToken={setToken} 
              setUser={setUser}
            />
          } />
        </Routes>
    </div>
  );
}

export default App;
