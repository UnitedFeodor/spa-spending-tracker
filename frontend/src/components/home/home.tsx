import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
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
        </div>
    )
}
export default Home