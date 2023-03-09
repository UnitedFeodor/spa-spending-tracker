import axios from 'axios';
import React from 'react';
import { redirect, useNavigate } from 'react-router-dom';

const AddPage = () => {
    const navigate = useNavigate()

   // TODO form validation
   const handleSubmit = (event : any) => {
        console.log('add handleSubmit ran');
        event.preventDefault();
        
        
        axios.postForm('/api/add', {
            amount: event.target.amount.value,
            type:  event.target.type.value,
            comments:  event.target.comments.value,
            filedata:  event.target.filedata.value,
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
        <form name="addForm" method="post" action="/api/add" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="spending-element">        

            <div className="element-amount">
                <label> AMOUNT </label>
                <input type="text" name="amount"/>
            
            </div>
            <div className="element-header">
                <label> SPENDING TYPE </label>
                <input type="text" name="type"/>
            
            </div>
            
            <div className="element-comment">
                <label> COMMENTS </label>
                    <textarea name="comments"></textarea>

            </div>

            <div className="element-file">
                <input type="file" name="filedata"/>
            </div>

            <input type="submit" value="SAVE"/>
        </div>

    </form>
    );
};

export default AddPage
;