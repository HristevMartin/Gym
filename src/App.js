import logo from './logo.svg';
// import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Header from './components/Header/Header';
import { Routes, Route, useLocation } from 'react-router-dom'
import { Home } from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Equipment from './components/Equipment/Equipment';
import React, { useState, useEffect } from 'react';
import Register from './components/Register/Register.js';
import Profile from './components/Profile/Profile';
import ItemCreate from './components/ItemCreate/ItemCreate';
import EditItem from './components/EditItem/EditItem';
import Login from './components/Login/Login';
import { AuthContextProvider } from './context/AuthContext';
import LogOut from './components/LogOut/LogOut';
import ItemDetails from './components/ItemDetail/ItemDetail';
import Programs from './components/Progams/Programs';
import ProgramDetail from './components/ProgramDetail/ProgramDetail';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import PrivateRoute from './components/Common/Common';
import Notification from './context/Notification.js';
import { NotificationProvider } from './context/NotificationContext';
import ScrollTest from './components/Test/Test';
import Forum from './components/Forum/Forum';
import ForumDetail from './components/ForumDetail/ForumDetail';
import Chat from './components/Chat/Chat';
import { MessageProvider } from './context/MessageContext';

function App() {

  // useEffect(() => {
  //   function handleBeforeUnload() {
  //     <LogOut autoNavigate={false} />;
  //   }
    
  //   window.addEventListener('beforeunload', handleBeforeUnload);
    
  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);

  const location = useLocation();
  const [showEquipmentBorder, setShowEquipmentBorder] = useState(false);
  const [showEquipmentHeight, setShowEquipmentHeight] = useState(false);
  const [showHeaderBorder, setshowHeaderBorder] = useState(false);

  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    setShowEquipmentBorder(location.pathname === '/equipment');
    setShowEquipmentHeight(location.pathname === '/equipment');
    setshowHeaderBorder(location.pathname === '/register' || location.pathname === '/login');
  }, [location.pathname]);

  return (
    <AuthContextProvider>
      <NotificationProvider>
        <div className={`App ${showEquipmentHeight ? 'equipment-height' : ''}`}>
          <Header 
          className={showEquipmentBorder ? 'header-with-border' : ''} height={showEquipmentHeight ? 'height' : ''}
            headerBorder={showHeaderBorder ? 'header-with-border' : ''  }
            unreadCount={unreadCount} setUnreadCount={setUnreadCount}
          />
          <Notification />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route element={< PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/upload-item" element={<ItemCreate />} />
              <Route path="/equipment" element={<Equipment />} />
              <Route path="/logout" element={<LogOut />} />
              <Route path="/item-details/:itemId" element={<ItemDetails />} />
              <Route path="/edit-item/:itemId" element={<EditItem />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/program-detail/:programId" element={<ProgramDetail />} />
              <Route path="/test" element={<ScrollTest />} />
              <Route path="/forum" element={<Forum />} />
              <Route path='/forum/:id' element={<ForumDetail />}/>
              <Route path='/chat/:userId' element={<Chat setUnreadCount={setUnreadCount} unreadCount={unreadCount} />} />
            </Route>
          </Routes>
          < Footer />
        </div>
      </NotificationProvider>
    </AuthContextProvider>
  );
}

export default App;
