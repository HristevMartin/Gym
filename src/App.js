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





function App() {
  const location = useLocation();
  const [showEquipmentBorder, setShowEquipmentBorder] = useState(false);
  const [showEquipmentHeight, setShowEquipmentHeight] = useState(false);
  const [showHeaderBorder, setshowHeaderBorder] = useState(false);



  useEffect(() => {
    setShowEquipmentBorder(location.pathname === '/equipment');
    setShowEquipmentHeight(location.pathname === '/equipment');
    setshowHeaderBorder(location.pathname === '/register' || location.pathname === '/login');
  }, [location.pathname]);

  return (
    <AuthContextProvider>
      <div className={`App ${showEquipmentHeight ? 'equipment-height' : ''}`}>
        <Header className={showEquipmentBorder ? 'header-with-border' : ''} height={showEquipmentHeight ? 'height' : ''}
          headerBorder={showHeaderBorder ? 'header-with-border' : ''}
        />    
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/equipment" element={<Equipment />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<LogOut />} />


          <Route path="/profile" element={<Profile />} />
          <Route path="/upload-item" element={<ItemCreate />} />
          <Route path="/item-details/:itemId" element={<ItemDetails />} />

          <Route path="/edit-item/:itemId" element={<EditItem />} />
          <Route path="/programs" element={<Programs />} />

        </Routes>
  

        < Footer />
  
      </div>
    </AuthContextProvider>
  );
}

export default App;
