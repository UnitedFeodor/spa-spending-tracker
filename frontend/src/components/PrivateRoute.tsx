import {
    Navigate,
    RouteProps
  } from 'react-router-dom';
  import authHeader from '../authHeader';
  
  export function PrivateRoute({ children }: RouteProps): JSX.Element {
    const isLoggedIn = Object.keys(authHeader()).length !== 0 
    console.log("authHeader",authHeader())
    console.log("privateRoute isLoggedIn",isLoggedIn)
    return (
      <>
        {
            isLoggedIn ? children : <Navigate to="/login"/>
        }
      </>
    );
  }