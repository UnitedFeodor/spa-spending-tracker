
import axios from "axios";
import authHeader from "./authHeader";

export default function checkAndGetTokens(){
    const xAccessToken = authHeader()
    const tokenUrl = '/api/token';
    axios.get(tokenUrl,{ 
        headers: xAccessToken,
        withCredentials: true,
    }).then((response) => {
        if (response.data.accessToken) {
            localStorage.setItem("accessToken", JSON.stringify(response.data.accessToken));
        }

    })
}

