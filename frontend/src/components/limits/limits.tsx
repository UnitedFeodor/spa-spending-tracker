import { Box, Button, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validateLimitsForm } from '../../validation';

const LimitsPage = () => {

    console.log("react component limits")
    const [limits,setLimits] = useState(null as any)

    const [type, setType] = React.useState('0');

    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value);
    };

    useEffect(() => {
        const apiUrl = '/api/limits';
        axios.get(apiUrl,{
            withCredentials: true,
          }).then((resp) => {
            console.log("get.then in useEffect limits")
            const data = resp.data;
            console.log("resp.data is ",resp.data);
            setLimits(data)
            //limits = data
        });
      }, []);

    const navigate = useNavigate()
    const handleSubmit = (event : any) => {
        console.log('limits handleSubmit');
        event.preventDefault();
        const amount = event.target.amount.value;
        const type = event.target.type.value;
        console.log("amount and type: ",amount,type)
        if (validateLimitsForm(event.target)) {
            axios.put('/api/limits', {
                amount: amount,
                type:  type,
            }, 
            {
                headers: {
                'content-type': 'application/json' 
                }
            }
            ).then((res) => {
                navigate("/")
            }
            ).catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    alert("Internal server error! Try again later")
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);

                    console.log()
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
        }


    }

    return (
        <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexDirection='column'
            maxWidth={900}
            margin='auto'
            padding={5}
            borderRadius={5}
            boxShadow={'5px 5px 10px #ccc'}
        >
            <Typography variant="h2"> Set new limits</Typography>
            <form method="post" name="limitsForm" encType="multipart/form-data" onSubmit={handleSubmit}>

                    <TextField name='amount' fullWidth={true} margin='normal' label="Amount"
                        variant="outlined" placeholder={ limits !== null ? limits : ""}/>
                    <Typography display="inline" variant="body1" sx={{marginRight: 3}}>LIMIT TYPE </Typography>
                    <Select 
                        sx={{minWidth: 150, maxHeight: 40}} 
                        name="type" 
                        label="Type" 
                        value={type}
                        onChange={handleChange}
                         >
                        <MenuItem  value="0" selected>Daily</MenuItem >
                        <MenuItem  value="1">Weekly</MenuItem >
                        <MenuItem  value="2">Monthly</MenuItem >
                        <MenuItem  value="3">Yearly</MenuItem >
                    </Select>
                    <br></br>
                
                    <Button type="submit" variant="contained" sx={{margin: 3, alignSelf:'center'}}>SAVE</Button>
                    <Button variant="text" sx={{margin: 3, alignSelf:'center'}}><Link to="/">CANCEL</Link></Button>
        </form>
    </Box>
    );
};

export default LimitsPage;