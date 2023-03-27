import {
    Navigate,
    RouteProps
  } from 'react-router-dom';
  import authHeader from '../authHeader';
  
  export function PrivateRoute({ children }: RouteProps): JSX.Element {
    const isLoggedIn = Object.keys(authHeader()).length !== 0 
    return (
      <>
        {
            isLoggedIn ? children : <Navigate to="/login"/>
        }
      </>
    );
  }