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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#e6f3f861',
    padding: theme.spacing(2),

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
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [projectList, setProjectList] = useState([])
    const [userList, setUserList] = useState([])
    const [mode,setMode]=useState('')
    const { register, handleSubmit,setValue, control, formState: { errors } } = useForm();
    const [colorValue, setColorValue] = useState('#ffffff')
    const [iconValue, setIconValue] = useState("HomeIcon")
    const [project,setProject]=useState({})
    const getProjectList = async () => {
        try {
            const response = await axios.get(`${baseUrl}/project/`,
                {
                    headers: { authorization }
                })
            setProjectList(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const handleChangeColor = (newValue) => {
        setColorValue(newValue)
    }

    const handleChangeIcon = (event: SelectChangeEvent) => {
        setIconValue(event.target.value);
    };

    const getUsersList = async () => {
        try {
            const response = await axios.get(`${baseUrl}/user`,
                {
                    headers: { authorization }
                })
            setUserList(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const handelUpdateProject = (project)=>{
        setMode('update')
        handleOpen()
        setProject(project)
        setColorValue(project.color)
        setIconValue(project.icon)
        console.log(project);
    }

    const onSubmit = async (data) => {
        if(mode==='create'){
            try {
                const response = await axios.post(`${baseUrl}/project`, data,
                    {
                        headers: { authorization }
                    })
                handleClose()
                getProjectList()
                toast.success('Project add sucessfuly')
            } catch (error) {
                console.log(error);
            }
        }else{
            try {
                const response = await axios.patch(`${baseUrl}/project/${project._id}`, data,
                    {
                        headers: { authorization }
                    })
                handleClose()
                getProjectList()
                toast.success('Project updated sucessfuly')
            } catch (error) {
                console.log(error);
            }
        }
        
    };

    useEffect(() => {
        getProjectList()
        getUsersList()
    }, [])
    return (
        <>
            <Grid sx={{ display: 'flex', justifyContent: 'space-between', margin: 5 }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#023a4c' }}>My Projects</Typography>
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
                                    <p>{project.description}</p>
                                    <Typography variant="p" gutterBottom>
                                        Project Color : <Brightness1Icon sx={{ color: project.color }} />
                                    </Typography>
                                    <p>Project Icon : {IconComponent && <IconComponent />}</p>
                                    <Divider />
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between',marginTop:2 }}>
                                    <Button variant="outlined" onClick={()=>handelUpdateProject(project)}>Update Project</Button>
                                    </Box>
                                    
                                </Item>
                            </Grid>
                        )
                    })}
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
                        {mode==='create'?'Create New Project':'Edit Project'}
                        
                    </Typography>
                    <Box component="form" sx={{ padding: 2, width: '80%', margin: '0 auto', display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{ marginBottom: 3 }}>
                            <TextField fullWidth id="standard-basic" label="Project Name" variant="outlined"
                                {...register("title", { required: 'title Is Required', maxLength: { value: 30, message: 'title Must Not Exceed 30' } })}
                            />
                            {mode==='update'?setValue('title',project. title):''}
                            {errors.title && <Typography variant="caption" color={'red'}>* {errors.title.message}</Typography>}
                        </Box>

                        <Box sx={{ marginBottom: 3 }}>
                            <MuiColorInput {...register("color")} size="small" variant="outlined" label="Project Color" format="hex" value={colorValue} onChange={handleChangeColor} />
                            {mode==='update'?setValue('color',project. color):''}
                        </Box>

                        <Box sx={{ marginBottom: 3, width: '25%' }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Icon</InputLabel>
                                <Select
                                    {...register("icon")}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={iconValue}
                                    label="Select Icon"
                                    onChange={handleChangeIcon}
                                >
                                    <MenuItem value={'HomeIcon'} selected={true} ><HomeIcon /></MenuItem>
                                    <MenuItem value={'BedtimeIcon'}><BedtimeIcon /></MenuItem>
                                    <MenuItem value={'BeenhereIcon'}><BeenhereIcon /></MenuItem>
                                    <MenuItem value={'CloudIcon'}><CloudIcon /></MenuItem>
                                    <MenuItem value={'EmojiObjectsIcon'}><EmojiObjectsIcon /></MenuItem>
                                    <MenuItem value={'EnhancedEncryptionIcon'}><EnhancedEncryptionIcon /></MenuItem>
                                    <MenuItem value={'FilterVintageIcon'}><FilterVintageIcon /></MenuItem>
                                </Select>
                                {mode==='update'?setValue('icon',project.icon):''}
                            </FormControl>
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
                            {mode==='update'?setValue('description',project.description):''}
                            {errors.description && <Typography variant="caption" color={'red'}>* {errors.description.message}</Typography>}
                        </Box>

                        <Box sx={{ marginBottom: 3 }}>
                            <Controller
                                name="members"
                                control={control}
                                defaultValue={mode==='create'?[]:project.members}
                                render={({ field }) => (
                                    <Autocomplete
                                        {...field}
                                        multiple
                                        id="size-small-outlined-multi"
                                        size="small"
                                        options={userList}
                                        getOptionLabel={(option) => option.username}
                                        onChange={(_, data) => field.onChange(data)}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Add Members" />
                                        )}
                                    />
                                )}
                            />
                        </Box>
                        <Box sx={{ alignSelf: 'end' }}>
                            <Button type="submit" variant="contained" sx={{ fontWeight: 'bold' }} onClick={handleOpen}>{mode==='create'?'Create':'Update'} Project</Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}

export default Project;
