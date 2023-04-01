import {
    Navigate,
    RouteProps,
    useNavigate
  } from 'react-router-dom';
  import authHeader from '../authHeader';
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { useEffect } from 'react';
import handleLogout from '../handleLogout';
  
  export function PrivateRoute({ children }: RouteProps): JSX.Element {

    let isLoggedIn = true
    const refreshAuthLogic = async (failedRequest: any) =>
        {
            console.log("inside refreshAuthLogic")
            const tokenUrl = '/api/token';
            await axios.get(tokenUrl,{ 
                headers: authHeader(),
                withCredentials: true,
            }).then((response) => {
                console.log("refreshAuthLogic response.data: ",response.data)
                if (response.data.accessToken) {
                    console.log("then response.data.accessToken: ",response.data.accessToken)
                    localStorage.setItem("accessToken", JSON.stringify(response.data.accessToken));
                    failedRequest.response.config.headers['x-access-token'] = response.data.accessToken;
                    isLoggedIn = true;
                } 
                return Promise.resolve();
            }).catch((error) => {
                console.log("get token .catch inside refteshAuthLogic: ",error)
                isLoggedIn = false
            });
            console.log("isLoggedIn after token get",isLoggedIn)
        }

    // Instantiate the interceptor
    createAuthRefreshInterceptor(axios, refreshAuthLogic as any,{
        pauseInstanceWhileRefreshing: false, // default: false
    });

    const navigate = useNavigate()
    // const handleLogout = (event : any) => {
    //   console.log("handleLogout ran")
    //   localStorage.clear();
    //   axios.post(`/api/logout`,{ 
    //       headers: authHeader(),
    //       withCredentials: true,
    //     }).then((res) => {
    //       console.log(".then navigate...")
    //       navigate("/login")
    //   })
    // }

    useEffect( () => {

        if (!isLoggedIn) {
          handleLogout(navigate)
        }
    },[])
    
    

     //Object.keys(authHeader()).length !== 0 
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