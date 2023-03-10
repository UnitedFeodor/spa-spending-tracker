import { TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LimitsPage = () => {

    console.log("react component limits")
    const [limits,setLimits] = useState(null as any)
    //let limits = null as any
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
        
        axios.postForm('/api/limits', {
            amount: event.target.amount.value,
            type:  event.target.type.value,
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

    return (
        <form method="post" name="limitsForm" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="spending-element" id="limit-spending-element">        

            <div className="element-amount">
                <label> AMOUNT </label>
                {/*}
                <input type="text" name="amount"  value={ limits !== null ? limits : ""} />
                {*/}
                <TextField name='amount' fullWidth={true} margin='normal' label="Amount"
                    variant="outlined" placeholder={ limits !== null ? limits : ""}
                />
            </div>
            <div className="element-header">
                <label> LIMIT TYPE </label>
                <select className="limits-select" name="type" >
                    <option value="0" selected>Daily</option>
                    <option value="1">Weekly</option>
                    <option value="2">Monthly</option>
                    <option value="3">Yearly</option>
                  </select>
            
            </div>
            <br/><br/><br/>
            <div /*style="display: block;"*/>
                <input type="submit" value="SAVE"/>
            </div>
        </div>

    </form>
    );
};

export default LimitsPage;