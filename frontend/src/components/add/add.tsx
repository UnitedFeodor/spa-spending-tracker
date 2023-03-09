import React from 'react';

const AddPage = () => {

   // TODO form validation


    return (
        <form name="addForm" method="post" action="/api/add" encType="multipart/form-data">
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