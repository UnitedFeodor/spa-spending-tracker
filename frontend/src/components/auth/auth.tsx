import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import RegisterPage from './register/register';
import LoginPage from './login/login';
import { Box, Button } from '@mui/material';
import './style.css'
import { alignProperty } from '@mui/material/styles/cssUtils';
import axios from 'axios';

const AuthRootComponent = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const location = useLocation()

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        console.log("email and password: ",email,password)
        const userData ={
            email,  
            password
        }
        if (location.pathname === '/login') {
            console.log("/login")
            const user = await axios.post("/api/login",userData)
                .then(response => {
                    console.log("response.data which is str user in localStorage: ",response.data)
                    if (response.data.accessToken) {
                        localStorage.setItem("user", JSON.stringify(response.data));
                        
                    }
            })
            
            

        } else if(location.pathname === '/register') {
            console.log("/register")
            const user = await axios.post("/api/register",userData)
            console.log(user.data)
        }

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
                    {   location.pathname === '/login' ? 
                            <LoginPage setEmail={setEmail} setPassword={setPassword}/> : 
                        location.pathname === '/register' ? 
                            <RegisterPage setEmail={setEmail} setPassword={setPassword}/> : null}
                    
                </Box>
                
            </form>

        </div>

    )
    //return (location.pathname === '/login' ? <LoginPage/> : location.pathname === '/register' ? <RegisterPage/> : null);
};

export default AuthRootComponent;