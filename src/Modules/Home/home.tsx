import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { jwtDecode } from 'jwt-decode';
import { Box, Container } from '@mui/material';

const Home = () => {
    let {loginData}=useContext(AuthContext)

    const getData = ()=>{
        console.log(loginData);
    }
    useEffect(()=>{
    },[])
    return (
        <Box>
            <h1>Home:</h1>
            <button onClick={getData}>click here</button>
            <h2>name: {loginData?.displayName}</h2>
            <div>
                <h1>hey</h1>
                <img  src='https://lh3.googleusercontent.com/a/ACg8ocLcnRbVjXgLNz8fs3Nufk5tqM257LOai8oMKohb9zlu8S6aYdQH=s96-c' alt="" />
            </div>
        </Box>
    );
}

export default Home;
