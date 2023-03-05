import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    const [spendingsList,setSpendingsList] = useState(null)

    useEffect(() => {
        fetch('/api')
        .then(res => res.json())
        .then(res => setSpendingsList(res)) 
    }, [])

    console.log(spendingsList)
    interface ISpending {
        type: string;
    }
    
    const arr: ISpending[] = spendingsList as unknown as ISpending[]

    
    const Test = ({arr} : any) => (
        <>
          {arr.map((el: any) => (
            <div key={el.type} className='element'>{el.type}</div>
          ))}
        </>
      );

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
}
export default Home