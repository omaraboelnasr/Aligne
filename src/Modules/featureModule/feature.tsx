import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ApiContext } from '../../context/apiContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Feature = () => {
    const { id } = useParams();
    const { baseUrl, authorization } = useContext(ApiContext)
    const [feature, setFeature] = useState({});

    const getFeatureData = async () => {
        try {
            const response = await axios.get(`${baseUrl}/feature/${id}`,
                {
                    headers: { authorization }
                })
                setFeature(response.data.data)
            console.log(response.data.data);
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
        getFeatureData();
    }, [])

    return (
        <div>
            feature with id : {id}
        </div>
    );
}

export default Feature;
