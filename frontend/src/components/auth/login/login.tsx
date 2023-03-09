import { Button, TextField, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = (props: any) => {
    const{setEmail,setPassword} = props

    return (
        <>
            <Typography variant="h2" padding={3}>Sign In</Typography>
            <TextField fullWidth={true} margin='normal' label="Email" variant="outlined" placeholder='Enter your email' 
                onChange={(e) => {setEmail(e.target.value)}}/>
            <TextField type="password" fullWidth={true} margin='normal' label="Password" variant="outlined" placeholder='Enter your password'
                onChange={(e) => {setPassword(e.target.value)}}/>    
            <Button type="submit" variant="contained" sx={{marginTop: 3}}>Sign In</Button>
            <Typography variant="body1" padding={3}>No account?
            <Link to="/register" > <span className="incitingText">Register</span> </Link>
            </Typography>
                
        </>
    );
};

export default LoginPage;