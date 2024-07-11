import { Box, Button, Card, CardContent, Divider, Grid, Modal, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ApiContext } from '../../context/apiContext';
import axios from 'axios';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import CloudIcon from '@mui/icons-material/Cloud';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { MuiColorInput } from 'mui-color-input';

const iconMapping = {
    'HomeIcon': HomeIcon,
    'BedtimeIcon': BedtimeIcon,
    'BeenhereIcon': BeenhereIcon,
    'CloudIcon': CloudIcon,
    'EmojiObjectsIcon': EmojiObjectsIcon,
    'EnhancedEncryptionIcon': EnhancedEncryptionIcon,
    'FilterVintageIcon': FilterVintageIcon,
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};


const ViewProject = () => {
    const { id } = useParams();
    const { baseUrl, authorization } = useContext(ApiContext)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [colorValue, setColorValue] = useState('#ffffff')
    const navigate = useNavigate()

    const [project, setProject] = useState({});
    const [features, setFeatures] = useState([]);
    const IconComponent = iconMapping[project.icon];
    const { register, handleSubmit, formState: { errors } } = useForm();

    const getProjectData = async () => {
        try {
            const response = await axios.get(`${baseUrl}/project/${id}`,
                {
                    headers: { authorization }
                })
            setProject(response.data.data)
            console.log(response.data.data);
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const getProjectFeature = async () => {
        try {
            const response = await axios.get(`${baseUrl}/feature/${id}`,
                {
                    headers: { authorization }
                })
            setFeatures(response.data.data)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    const handleChangeColor = (newValue) => {
        setColorValue(newValue)
    }

    const handleViewFeature = (id)=>{
        navigate(`/feature/${id}`)
    }

    const onSubmit = async (data) => {
            data.projectId = id
            try {
                const response = await axios.post(`${baseUrl}/feature`, data,
                    {
                        headers: { authorization }
                    })
                getProjectFeature()
                handleClose()
                toast.success('Feature add sucessfuly')
            } catch (error) {
                toast.error(error.response.data.message)
            }
    };


    useEffect(() => {
        getProjectData();
        getProjectFeature()
    }, [])


    return (
        <>
            <Box sx={{ margin: 5, border: '1px solid #023a4c', padding: 5, borderRadius: 3, backgroundColor: 'white' }}>
                <Grid container spacing={2} sx={{ justifyContent: 'space-between', marginBottom: 2 }}>
                    <Grid item md={6} sx={{ display: 'flex' }}>
                        <Typography variant="h5">Project : </Typography>
                        <Typography variant="h5">{project?.title}</Typography>
                    </Grid>
                    <Grid item md={3} sx={{ display: 'flex' }}>
                        <Typography variant="h5">Project Icon : </Typography>
                        <Typography >{IconComponent && <IconComponent sx={{ fontSize: 30 }} />}</Typography>
                    </Grid>
                    <Grid item md={3} sx={{ display: 'flex' }}>
                        <Typography variant="h5">Project Color : </Typography>
                        <Brightness1Icon sx={{ color: project.color, fontSize: 30 }} />
                    </Grid>
                </Grid>
                <Divider />
                <Grid container spacing={2} sx={{ justifyContent: 'space-between', marginTop: 2, marginBottom: 2 }}>
                    <Grid item >
                        <Typography variant="h5">Project Description </Typography>
                        <Typography variant="body1">{project?.description}</Typography>
                    </Grid>
                </Grid>
                <Divider />
                <Grid container spacing={2} sx={{ justifyContent: 'space-between', marginTop: 1, marginBottom: 2 }}>
                    <Grid item md={3} >
                        <Typography variant="h5">Project Members  </Typography>
                        {project?.members?.map((member) =>
                            <Typography key={member._id}>{member?.username}</Typography>
                        )}
                    </Grid>
                </Grid>
                <Divider />
                <Grid container spacing={2} sx={{ marginTop: 1 }}>
                    <Grid item md={12}>
                        <Typography variant="h5">Project Features  </Typography>
                    </Grid>


                    {features.map((feature) =>
                        <Grid item md={3} key={feature._id} >
                            <div onClick={()=>handleViewFeature(feature._id)}>
                            <Card sx={{ padding: 2, minWidth: 275, margin: 2,cursor:'pointer' }}>
                                <Typography gutterBottom>
                                    {feature.title}
                                </Typography>
                            </Card>
                            </div>
                        </Grid>
                    )}

                    <Grid item md={3}  >
                        <div onClick={handleOpen}>
                        <Card sx={{ padding: 2, minWidth: 275, margin: 2,display:'flex',cursor:'pointer' }} >
                            <AddIcon />
                            <Typography gutterBottom>
                                Add Feature
                            </Typography>
                        </Card>
                        </div>
                    </Grid>
                </Grid>
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" fontWeight={800} sx={{ color: '#023a4c' }}>
                        Create New Feature
                    </Typography>
                    <Box component="form" sx={{ padding: 2, width: '80%', margin: '0 auto', display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{ marginBottom: 3 }}>
                            <TextField fullWidth id="standard-basic" label="Title" variant="outlined"
                                {...register("title", { required: 'title Is Required', maxLength: { value: 30, message: 'title Must Not Exceed 30' } })}
                            />
                            {errors.title && <Typography variant="caption" color={'red'}>* {errors.title.message}</Typography>}
                        </Box>

                        <Box sx={{ marginBottom: 3 }}>
                            <MuiColorInput {...register("color")} size="small" variant="outlined" label="Color" format="hex" value={colorValue} onChange={handleChangeColor} />
                        </Box>

                        <Box sx={{ marginBottom: 3 }}>
                            <TextField
                                label="Description"
                                multiline
                                maxRows={4}
                                variant="outlined"
                                fullWidth
                                {...register("description", { required: 'Description Is Required' })}
                            />
                            {errors.description && <Typography variant="caption" color={'red'}>* {errors.description.message}</Typography>}
                        </Box>

                        <Box sx={{ alignSelf: 'end' }}>
                            <Button type="submit" variant="contained" sx={{ fontWeight: 'bold' }} > Add Feature</Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}

export default ViewProject;
