import { Typography, TextField, Button } from '@mui/material';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = (props: any) => {
    const{setEmail,setPassword} = props

    return (
        <Fragment>
            <Typography variant="h2" padding={3}>Register</Typography>
            <TextField fullWidth={true} margin='normal' label="Email" variant="outlined" placeholder='Enter your email'
                onChange={(e) => {setEmail(e.target.value)}}/>
            <TextField type="password" fullWidth={true} margin='normal' label="Password" variant="outlined" placeholder='Enter your password'
                onChange={(e) => {setPassword(e.target.value)}}/>    
            <Button type="submit" variant="contained" sx={{marginTop: 3}}>Register</Button>
             
            <Typography variant="body1" padding={3}>Already have an account?
                <Button variant="text"><Link to="/login">Sign In</Link></Button>
            </Typography>

        </Fragment>
    );
};

export default RegisterPage;