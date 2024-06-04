import axios from 'axios';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Redirect = () => {
    const { search } = useLocation()
    const navigate = useNavigate()
    const getToken = async ()=>{
        try{
            const response = await axios.get(`http://localhost:3000/v1/auth/google/redirect${search}`)
            localStorage.setItem('token',response.data.token)
            navigate('/')
        }catch(error){
            console.log("Error in getToken: ",error);
        }
    }

    useEffect(()=>{
        getToken()
    },[])

    return (
        <div>
            <h1>Redirect page....</h1>
        </div>
    );
}

export default Redirect;
