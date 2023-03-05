import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './components/auth/login/login';
import Home from './components/home/home';
import AddPage from './components/add/add';
import LimitsPage from './components/limits/limits';
import RegisterPage from './components/auth/register/register';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          
          <Route path="/add" element={<AddPage/>}/>
          <Route path="/limits" element={<LimitsPage/>}/>
        </Routes>
        
    </div>
  );
}

export default App;
