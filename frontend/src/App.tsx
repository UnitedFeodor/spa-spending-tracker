import React from 'react';
import './App.css';
import Home from './components/home';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './login';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<LoginPage/>}/>

        </Routes>
        
    </div>
  );
}

export default App;
