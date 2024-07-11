import { Autocomplete, Box, Button, Divider, FormControl, Grid, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import { Controller, useForm } from 'react-hook-form';
import { MuiColorInput } from 'mui-color-input';

import HomeIcon from '@mui/icons-material/Home';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import CloudIcon from '@mui/icons-material/Cloud';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import { ApiContext } from '../../context/apiContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../SharedModule/DeleteModal/deleteModal';
import CreateModal from '../SharedModule/CreateModal/createModal';

const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: '#e6f3f861',
    padding: theme.spacing(2),
    borderRadius: 15

}));

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


const iconMapping = {
    'HomeIcon': HomeIcon,
    'BedtimeIcon': BedtimeIcon,
    'BeenhereIcon': BeenhereIcon,
    'CloudIcon': CloudIcon,
    'EmojiObjectsIcon': EmojiObjectsIcon,
    'EnhancedEncryptionIcon': EnhancedEncryptionIcon,
    'FilterVintageIcon': FilterVintageIcon,
};


const Project = () => {
    const { baseUrl, authorization } = useContext(ApiContext)
    const [projectId, setProjectId] = useState('')
    const [project,setProject]=useState({})
    const [projectList, setProjectList] = useState([])
    const [userList, setUserList] = useState([])
    const [mode, setMode] = useState('')
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const navigate = useNavigate()
    const handleOpen = () => setOpen(true);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => {
        setOpenDelete(false)
    };
    
    const getProjectList = async () => {
        try {
            const response = await axios.get(`${baseUrl}/project/`,
                {
                    headers: { authorization }
                })
            setProjectList(response.data.data)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const getUsersList = async () => {
        try {
            const response = await axios.get(`${baseUrl}/user`,
                {
                    headers: { authorization }
                })
            setUserList(response.data.data)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const handelUpdateProject = (project) => {
        setMode('update')
        handleOpen()
        setProjectId(project._id)
        setProject(project)
    }

    const openDeleteProject = (id) => {
        handleOpenDelete()
        setProjectId(id)
    }

    const handleDeleteProject = async () => {
        try {
            const response = await axios.delete(`${baseUrl}/project/${projectId}`,
                {
                    headers: { authorization }
                })
            getProjectList()
            toast.success('Project deleted sucessfuly')
            handleCloseDelete()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const handelViewProject = (id) => {
        navigate(`/project/${id}`)
    }

    useEffect(() => {
        getProjectList()
        getUsersList()
    }, [])
    return (
        <>
            <Grid sx={{ display: 'flex', justifyContent: 'space-between', margin: 5 }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Projects</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold', fontSize: 16 }}>View and manage your ongoing projects.</Typography>
                </Box>
                <Box>
                    <Button variant="contained" sx={{ fontWeight: 'bold' }} onClick={() => { handleOpen(); setMode('create'); }}>Add New Project</Button>
                </Box>
            </Grid>

            <Box sx={{ flexGrow: 1, margin: 5 }}>
                <Grid container spacing={2}>
                    {projectList.map((project) => {
                        const IconComponent = iconMapping[project.icon];
                        return (
                            <Grid item xs={4} key={project._id}>
                                <Item>
                                    <Typography variant="h6" gutterBottom>
                                        {project.title}
                                    </Typography>
                                    <Divider />
                                    <Typography variant="body1" gutterBottom >
                                        {project.description}
                                    </Typography>
                                    <Box sx={{ display: 'flex' }}>
                                        <Typography variant="body1" gutterBottom >
                                            Project Color :
                                        </Typography>
                                        <Typography variant="body1" gutterBottom >
                                            <Brightness1Icon sx={{ color: project.color }} />
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex' }}>
                                        <Typography variant="body1" gutterBottom >
                                            Project Icon :
                                        </Typography>
                                        <Typography variant="body1" gutterBottom >
                                            {IconComponent && <IconComponent />}
                                        </Typography>
                                    </Box>

                                    <Divider />
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                                        <Button variant="outlined" color="success" onClick={() => handelViewProject(project._id)}>
                                            View
                                        </Button>
                                        <Button variant="outlined" onClick={() => handelUpdateProject(project)}>Update</Button>
                                        <Button variant="outlined" color="error" onClick={() => openDeleteProject(project._id)}>
                                            Delete
                                        </Button>
                                    </Box>
                                </Item>
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>

            <CreateModal open={open} setOpen={setOpen} mode={mode} userList={userList} project={project} projectId={projectId} getProjectList={getProjectList}/>
            <DeleteModal openDelete={openDelete} handleCloseDelete={handleCloseDelete} handleDeleteProject={handleDeleteProject}/>
        </>
    );
}

export default Project;
