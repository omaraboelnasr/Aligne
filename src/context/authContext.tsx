import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export let AuthContext = createContext(null)

export function AuthContextProvider(props){
    const [loginData,setLoginData]=useState(null)
    const saveLoginData = ()=>{
        const encodedToken = localStorage.getItem('token');
        if (encodedToken) {
            const decodedToken = jwtDecode(encodedToken);
            setLoginData(decodedToken);
        }
    }
    useEffect(() => {
            saveLoginData()
    }, [])
    return (
        <AuthContext.Provider value={{loginData,saveLoginData,setLoginData}}>
            {props.children}
        </AuthContext.Provider>
    )
}