import axios from 'axios'
import React, { Fragment, Key, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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

    
    const Test = ({arr} : any) => (
        <>
          {arr.map((el: any) => (
            <div key={el.type} className='element'>{el.type}</div>
          ))}
        </>
      );

    let listItems = null
    if (arr !== null) {

        listItems = arr.map((item) => (
            <Fragment key={item._id as Key}>
                <li>
                    {/* Passing unique value to 'key' prop, eases process for virtual DOM to remove specific element and update HTML tree  */}
                    <span>amount : {item.amount} </span>
                    <span>type: {item.type}</span>
                    <span>comment: {item.comments} </span>
                    <span>date: {item.date.toLocaleString()} </span>
                    <span><img src={String(item.image)} width="300" height="300" alt=" "></img></span>
                </li>
            </Fragment>
        ));
    }


    
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
            {!listItems ?'sadly null :(' :  listItems}
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