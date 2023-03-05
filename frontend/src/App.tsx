import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home/home';
import AddPage from './components/add/add';
import LimitsPage from './components/limits/limits';
import AuthRootComponent from './components/auth/auth';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<AuthRootComponent/>}/>
          <Route path="/register" element={<AuthRootComponent/>}/>
          
          <Route path="/add" element={<AddPage/>}/>
          <Route path="/limits" element={<LimitsPage/>}/>
        </Routes>
        
    </div>
  );
}

export default App;
