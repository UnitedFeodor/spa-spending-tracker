import axios from 'axios'
import React, { Fragment, Key, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import  Dinero from "dinero.js";

const Home = () => {
    const [spendingsList,setSpendingsList] = useState(null)
    const [limits,setLimits] = useState(null as any)
    const [helper,setHelper] = useState(null as any)

/*    
    useEffect(() => {
        fetch('/spendings')
        .then(res => res.json())
        .then(res => setParams(res)) 
    }, [])
    */

    useEffect(() => {
        const apiUrl = '/api/spendings';
        axios.get(apiUrl).then((resp) => {
          const data = resp.data;
          console.log("resp.data is ",resp.data);
          console.log("resp.data.list is ",resp.data.list);
          setSpendingsList(data.list);
          setLimits(data.limits)
          setHelper(data.helper)
        });
      }, []);
    

    console.log("spendingList is ",spendingsList)

    interface ISpending {
        //  Dinero({amount: 10000,currency: 'USD'})
        _id: String,
        amount:  String,

        type:String, 
        comments:String, 
        date: Date, 
        image: String,
    
    }
    interface ILimits {
        dailyLimit: Dinero.Dinero;
        weeklyLimit: Dinero.Dinero;
        monthlyLimit: Dinero.Dinero;
        yearlyLimit: Dinero.Dinero;
    }
    
    const spendingsArray: ISpending[] = spendingsList as unknown as ISpending[]
    const limitsObj: ILimits = limits as unknown as ILimits 
    let limitsPanel = null
    if(limitsObj !== null && helper !== null) {
        limitsPanel = <Fragment>
                <div className="limits-info" >
                    <div className="all-limits">
                        <div>Daily Limit:{limits.limits.dailyLimit} </div>
                        <div>Weekly Limit:{limits.limits.weeklyLimit}</div>
                        <div>Monthly Limit:{limits.limits.monthlyLimit} </div>
                        <div>Yearly Limit:{limits.limits.yearlyLimit} </div>   
                    </div>

                    <div className="all-limits" id="spendings">
                        <div>    
                            Spent in total: {limits.total}</div>
                        <div>{limits.checks.exceedingDaily}</div>
                    </div>
                </div>
            
            </Fragment>

    }

    /*
    const Test = ({spendingsArray} : any) => (
        <>
          {spendingsArray.map((el: any) => (
            <div key={el.type} className='element'>{el.type}</div>
          ))}
        </>
      );
*/

    let listItems = null
    if (spendingsArray !== null) {

        listItems = spendingsArray.map((item) => (
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
                        <div className="element-amount">{item.amount}</div>
                        </td>
                        <td>
                            <div className="element-header">{item.type}</div>
                        </td>
                        <td>
                            <form name="element-form" method="post" id="delete-form" encType="multipart/form-data">
                                <input type="hidden" name="_id" value={String(item._id)} />
                                <input type="hidden" name="image" value={(item.image !== null) ? String(item.image)  : '' } />
                                <input type="submit" value="Delete"/>
                            </form>
                        </td>
                    </tr>
                    <tr >
                        <div id="element-date" className="element-header">
                            {new Date(item.date).toLocaleDateString()}   
                        </div> 
                    </tr>
                
                    <tr >
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
    console.log("listItems is ", listItems)
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


            {!limitsPanel ?'no limits :(' :  limitsPanel}


            <div className="spending-element-margins" >
                <div className="add-new-element">
                    <Link to="/add"><button className="add-button">ADD NEW SPENDINGS</button></Link>
                    <Link to="/limits"><button id="limits-button" className="add-button">CHANGE LIMITS</button></Link>
                </div>
            </div>

            <table className='tableWrapper'>
                {!listItems ?'no spendigns :(' :  listItems}
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
            { !spendingsArray ?'sadly null :(' : <Test spendingsArray={spendingsArray}/>}
            

        </div>
    )
    */
}
export default Home