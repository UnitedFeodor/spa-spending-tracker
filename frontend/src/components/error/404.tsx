import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound404 = () => {
    return (
        <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexDirection='column'
        >
            <Typography variant="h2" padding={3}>Oops! You seem to be lost.</Typography>
            <Typography variant="body1" padding={3}><Link to='/'>RETURN HOME</Link></Typography>
            
            
            
        </Box>
    );
};

export default NotFound404;