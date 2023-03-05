import { Typography, TextField, Button } from '@mui/material';
import React, { Fragment } from 'react';

const RegisterPage = () => {
    return (
        <Fragment>
            <Typography variant="h2" padding={3}>Register</Typography>
            <TextField fullWidth={true} margin='normal' label="Email" variant="outlined" placeholder='Enter your email'/>
            <TextField type="password" fullWidth={true} margin='normal' label="Password" variant="outlined" placeholder='Enter your password'/>    
            <Button variant="contained" sx={{marginTop: 3}}>Register</Button>
            <Typography variant="body1" padding={3}>Already have an account?<span className="incitingText">Sign In</span></Typography>

        </Fragment>
    );
};

export default RegisterPage;