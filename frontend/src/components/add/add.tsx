import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { validateSpendingForm } from '../../validation';

const AddPage = () => {
    const navigate = useNavigate()

   // TODO form validation
   const handleSubmit = (event : any) => {
        console.log('add handleSubmit ran');
        event.preventDefault();
        if (validateSpendingForm(event.target)) {

        
            const fileToUpload = event.target.filedata.files[0]//event.target.filedata.value
            console.log(fileToUpload)
            let form = new FormData();
            form.set('filedata',fileToUpload)
            form.set('amount',event.target.amount.value)
            form.set('type',event.target.type.value)
            form.set('comments',event.target.comments.value)
            axios.postForm('/api/add', form, {
                headers: {
                'content-type': 'multipart/form-data' // do not forget this 
                }
            }).then((res) => {
                navigate("/")
            }).catch(function (error) {
                if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
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
                    
                    <Typography variant="h2"> Add a spending</Typography>
            <form name="addForm" method="post" action="/api/add" encType="multipart/form-data" onSubmit={handleSubmit}>

                <TextField name='amount' fullWidth={true} margin='normal' label="Amount"
                    variant="outlined" />
            
                <TextField name='type' fullWidth={true} margin='normal' label="Type"
                    variant="outlined" />
            
        
                <TextField name='comments' fullWidth={true} margin='normal' label="Comments"
                white-space= 'pre-wrap'
                sx={{width:900}}
                multiline
                rows={5}
                maxRows={15}
                variant="outlined" />


                <input type="file" name="filedata"/> 
                <br></br>
            
                <Button type="submit" variant="contained" sx={{margin: 3, alignSelf:'center'}}>SAVE</Button>
                <Button variant="text" sx={{margin: 3, alignSelf:'center'}}><Link to="/">CANCEL</Link></Button>
                
        </form>
    </Box>
    );
};

export default AddPage
;