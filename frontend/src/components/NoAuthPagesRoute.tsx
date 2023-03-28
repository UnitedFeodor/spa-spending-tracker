import {
    Navigate,
    RouteProps
  } from 'react-router-dom';
  import authHeader from '../authHeader';
  
  export function NoAuthPagesRoute({ children }: RouteProps): JSX.Element {
    const isLoggedIn = Object.keys(authHeader()).length !== 0 
    return (
      <>
        {
            isLoggedIn ? <Navigate to="/"/>  : children 
        }
      </>
    );
  }