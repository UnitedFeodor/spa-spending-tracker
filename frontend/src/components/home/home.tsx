import axios from 'axios'
import React, { Fragment, Key, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './style.css'

const Home = () => {
    const [spendingsList,setSpendingsList] = useState(null)

/*    
    useEffect(() => {
        fetch('/spendings')
        .then(res => res.json())
        .then(res => setSpendingsList(res)) 
    }, [])
    */

    useEffect(() => {
        const apiUrl = '/spendings';
        axios.get(apiUrl).then((resp) => {
          const data = resp.data;
          console.log(resp.data);
          setSpendingsList(data);
        });
      }, [setSpendingsList]);
    

    console.log(spendingsList)

    interface ISpending {
        //  Dinero({amount: 10000,currency: 'USD'})
        _id: any,
        amount:  String,

        type:String, 
        comments:String, 
        date: Date, 
        image: String,
    
    }
    
    const arr: ISpending[] = spendingsList as unknown as ISpending[]

    /*
    const Test = ({arr} : any) => (
        <>
          {arr.map((el: any) => (
            <div key={el.type} className='element'>{el.type}</div>
          ))}
        </>
      );
*/
    let listItems = null
    if (arr !== null) {

        listItems = arr.map((item) => (
            <Fragment key={item._id as Key}>
                {/*}
                <li>
                    <span>amount : {item.amount} </span>
                    <span>type: {item.type}</span>
                    <span>comment: {item.comments} </span>
                    <span>date: {item.date.toLocaleString()} </span>
                    <span><img src={String(item.image)} width="300" height="300" alt=" "></img></span>
                </li>
                {*/}
                <div className="spending-element">        
            
                    <tr>
                        <td>
                            <div className="element-amount">
                                {item.amount}
                            </div>
                        </td>
                        <td>
                            <div className="element-header">
                                {item.type}
                            </div>
                        </td>
                        <td>
                            <form name="element-form" method="post" id="delete-form" encType="multipart/form-data">
                                <input type="hidden" name="_id" value={item._id} />
                                <input type="hidden" name="image" value={(item.image !== null) ? String(item.image)  : '' } />
                                <input type="submit" value="Delete"/>
                            </form>
                        </td>
                    </tr>
                    <tr>
                    <div id="element-date" className="element-header">
                        {item.date.toLocaleString()}    
                    </div>
                    </tr>
                
                    <tr>
                    <br></br>
                    <div className="element-comment">
                        <img src={String(item.image)} width="300" height="300" alt=" "></img>
                        <br></br>
                        {item.comments}
                    </div>
                    </tr>
                </div>

            </Fragment>
        ));
    }

    // TODO fix all the margins
    // TODO fix null images
    
    return(
        <div>
            <h1> this is the home page</h1>
            <nav>
                <li><Link to='/'>home</Link></li>
                <li><Link to='/login'>login</Link></li>
                <li><Link to='/register'>register</Link></li>
                <li><Link to='/add'>add</Link></li>
                <li><Link to='/limits'>limits</Link></li>
            </nav>
            <table className='tableWrapper'>
                {!listItems ?'sadly null :(' :  listItems}
            </table>
        </div>
        

    )
      /*
    return (
        <div> 
            <h1> this is the home page</h1>
            <nav>
                <li><Link to='/'>home</Link></li>
                <li><Link to='/login'>login</Link></li>
                <li><Link to='/register'>register</Link></li>
                <li><Link to='/add'>add</Link></li>
                <li><Link to='/limits'>limits</Link></li>
            </nav>
            { !arr ?'sadly null :(' : <Test arr={arr}/>}
            

        </div>
    )
    */
}
export default Home