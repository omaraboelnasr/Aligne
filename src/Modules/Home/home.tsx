import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { jwtDecode } from 'jwt-decode';

const Home = () => {
    let {loginData}=useContext(AuthContext)

    const getData = ()=>{
        console.log(loginData);
    }
    useEffect(()=>{
    },[])
    return (
        <div>
            <h1>Home:</h1>
            <button onClick={getData}>click here</button>
            <h2>name: {loginData?.displayName}</h2>
        </div>
    );
}

export default Home;
