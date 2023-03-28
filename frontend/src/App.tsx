import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home/home';
import AddPage from './components/add/add';
import LimitsPage from './components/limits/limits';
import AuthRootComponent from './components/auth/auth';
import './index.css' 
import NotFound404 from './components/error/404';
import { PrivateRoute } from './components/PrivateRoute';
import { NoAuthPagesRoute } from './components/NoAuthPagesRoute';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='*' element={<NotFound404 />}/>
          <Route path="/" element={
            <PrivateRoute>
              <Home/>
            </PrivateRoute>
          }/>
          <Route path="/login" element={
            <NoAuthPagesRoute>
              <AuthRootComponent/>
            </NoAuthPagesRoute>
          }/>
          <Route path="/register" element={<AuthRootComponent/>}/>
          
          <Route path="/add" element={
            <PrivateRoute>
              <AddPage/>
            </PrivateRoute>
          }/>
          <Route path="/limits" element={
            <PrivateRoute>
              <LimitsPage/>
            </PrivateRoute>
          }/>
        </Routes>
        
    </div>
  );
}

export default App;
