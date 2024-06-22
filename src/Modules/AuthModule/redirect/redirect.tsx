import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';

const Redirect = () => {
    let {loginData,saveLoginData}=useContext(AuthContext)

    const { search } = useLocation()
    const navigate = useNavigate()
    const getToken = async ()=>{
        try{
            const response = await axios.get(`http://localhost:3000/v1/auth/google/redirect${search}`)
            localStorage.setItem('token',response.data.token)
            saveLoginData()
            navigate('/')
        }catch(error){
            console.log("Error in getToken: ",error);
        }
    }

    useEffect(()=>{
        if(!loginData){
            getToken()
        }
    },[])

    return (
        <div>
            <h1>Redirect page....</h1>
        </div>
    );
}

export default Redirect;
