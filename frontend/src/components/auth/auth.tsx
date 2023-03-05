import React from 'react';
import { useLocation } from 'react-router-dom';
import RegisterPage from './register/register';
import LoginPage from './login/login';

const AuthRootComponent = () => {
    const location = useLocation()
    return (location.pathname === '/login' ? <LoginPage/> : location.pathname === '/register' ? <RegisterPage/> : null);
};

export default AuthRootComponent;