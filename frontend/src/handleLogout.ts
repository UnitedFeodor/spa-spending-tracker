import axios from "axios";
import { NavigateFunction } from "react-router-dom";

export default function handleLogout(navigate: NavigateFunction){
    console.log(handleLogout)
    localStorage.clear();
    axios.post(`/api/logout`,{ 
        withCredentials: true,
      }).then((res) => {
        navigate("/login")
    })
}