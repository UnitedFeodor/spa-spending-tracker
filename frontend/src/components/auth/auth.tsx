import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import RegisterPage from './register/register';
import LoginPage from './login/login';
import { Box, Button } from '@mui/material';
import './style.css'
import { alignProperty } from '@mui/material/styles/cssUtils';

const AuthRootComponent = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const location = useLocation()

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        console.log(email)

    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <Box
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    flexDirection='column'
                    maxWidth={640}
                    margin='auto'
                    padding={5}
                    borderRadius={5}
                    boxShadow={'5px 5px 10px #ccc'}
                >
                    <Button variant="text" sx={{marginRight: 'auto'}}><Link to="/">HOME</Link></Button>
                    {location.pathname === '/login' ? <LoginPage setEmail={setEmail} setPassword={setPassword}/> : 
                        location.pathname === '/register' ? <RegisterPage setEmail={setEmail} setPassword={setPassword}/> : null}
                    
                </Box>
                
            </form>

        </div>

    )
    //return (location.pathname === '/login' ? <LoginPage/> : location.pathname === '/register' ? <RegisterPage/> : null);
};

export default AuthRootComponent;