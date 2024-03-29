import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import RegisterPage from './register/register';
import LoginPage from './login/login';
import { Box, Button } from '@mui/material';
import './style.css'
import { alignProperty } from '@mui/material/styles/cssUtils';
import axios from 'axios';

const AuthRootComponent = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const navigate = useNavigate()
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
                        localStorage.setItem("accessToken", JSON.stringify(response.data.accessToken));
                        navigate("/")
                    } else {
                        alert("Inavlid login and password combination!")
                    }
            })
            
            

        } else if(location.pathname === '/register') {
            console.log("/register")
            const user = await axios.post("/api/register",userData)
                .then(response => {
                    console.log(response.data)

                    if (response.status === 200) {
                        navigate("/login")
                    } else if (response.status === 502)  {
                        alert(response.data.error)
                    }
                
                }).catch(err => {
                    console.log("register error",err)
                    alert(err.response.data.error)
                    //alert("Inavlid login and password combination!")
                })
            
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