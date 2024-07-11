import React, { useContext, useEffect } from 'react';
import { ApiContext } from '../../../context/apiContext';
import { Controller, useForm } from 'react-hook-form';
import { Autocomplete, Box, Button, FormControl, MenuItem, InputLabel, Modal, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { MuiColorInput } from 'mui-color-input';
import HomeIcon from '@mui/icons-material/Home';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import CloudIcon from '@mui/icons-material/Cloud';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import axios from 'axios';
import { toast } from 'react-toastify';

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

const CreateModal = ({open,setOpen,mode,userList,project,projectId,getProjectList}) => {
    const { baseUrl, authorization } = useContext(ApiContext)
    const { register, handleSubmit, setValue, reset, getValues, watch, control, formState: { errors } } = useForm({defaultValues: {
        icon: 'HomeIcon',
        color:'#000000',
        title:'',
        description:'',
        members:[]
    }});
    const handleClose = () => {
        setOpen(false)
    }
    
    const updatedColor = watch('color')
    
    const handleChangeIcon = (event: SelectChangeEvent) => {
        setValue('icon', event.target.value)
    };
    
    const handelUpdateValue = ()=>{
        setValue('title', project.title)
        setValue('color', project.color)
        setValue('icon', project.icon)
        setValue('description', project.description)
        setValue('members', project.members)
    }
    
    const onSubmit = async (data) => {
        if (mode === 'create') {
            try {
                const response = await axios.post(`${baseUrl}/project`, data,
                    {
                        headers: { authorization }
                    })
                handleClose()
                getProjectList()
                toast.success('Project add sucessfuly')
            } catch (error) {
                toast.error(error.response.data.message)
            }
        } else {
            try {
                const response = await axios.patch(`${baseUrl}/project/${projectId}`, data,
                    {
                        headers: { authorization }
                    })
                handleClose()
                getProjectList()
                toast.success('Project updated sucessfuly')
            } catch (error) {
                toast.error(error.response.data.message)
            }
        }
    };

    useEffect(() => {
        if (mode === 'update') {
            handelUpdateValue();
        }

        if (mode === 'create') {
            reset();
        }
    }, [mode,project]);

    return (
        <>
        <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" fontWeight={800} sx={{ color: '#023a4c' }}>
                        {mode === 'create' ? 'Create New Project' : 'Edit Project'}

                    </Typography>
                    <Box component="form" sx={{ padding: 2, width: '80%', margin: '0 auto', display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{ marginBottom: 3 }}>
                            <TextField fullWidth id="standard-basic" label="Project Title" variant="outlined"
                                {...register("title", { required: 'title Is Required', maxLength: { value: 30, message: 'title Must Not Exceed 30' } })}
                            />
                            {errors.title && <Typography variant="caption" color={'red'}>* {errors.title.message}</Typography>}
                        </Box>

                        <Box sx={{ marginBottom: 3 }}>
                            <MuiColorInput {...register("color")} size="small" variant="outlined" label="Color" format="hex" value={updatedColor} onChange={(color) => {
                                setValue('color', color)
                            }} />
                        </Box>

                        <Box sx={{ marginBottom: 3, width: '25%' }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Icon</InputLabel>
                                <Select
                                    {...register("icon")}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={getValues('icon')}
                                    label="Select Icon"
                                    onChange={handleChangeIcon}
                                >
                                    <MenuItem value={'HomeIcon'}><HomeIcon /></MenuItem>
                                    <MenuItem value={'BedtimeIcon'}><BedtimeIcon /></MenuItem>
                                    <MenuItem value={'BeenhereIcon'}><BeenhereIcon /></MenuItem>
                                    <MenuItem value={'CloudIcon'}><CloudIcon /></MenuItem>
                                    <MenuItem value={'EmojiObjectsIcon'}><EmojiObjectsIcon /></MenuItem>
                                    <MenuItem value={'EnhancedEncryptionIcon'}><EnhancedEncryptionIcon /></MenuItem>
                                    <MenuItem value={'FilterVintageIcon'}><FilterVintageIcon /></MenuItem>
                                </Select>
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
                            {errors.description && <Typography variant="caption" color={'red'}>* {errors.description.message}</Typography>}
                        </Box>

                        <Box sx={{ marginBottom: 3 }}>
                            <Controller
                                name="members"
                                control={control}
                                defaultValue={[]}
                                render={({ field }) => (
                                    <Autocomplete
                                        {...field}
                                        multiple
                                        id="size-small-outlined-multi"
                                        size="small"
                                        options={userList}
                                        getOptionLabel={(option) => option.username}
                                        isOptionEqualToValue={(option, value) => option._id === value._id}
                                        onChange={(_, data) => field.onChange(data)}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Add Members" />
                                        )}
                                    />
                                )}
                            />
                        </Box>
                        <Box sx={{ alignSelf: 'end' }}>
                            <Button type="submit" variant="contained" sx={{ fontWeight: 'bold' }}>{mode === 'create' ? 'Create' : 'Update'} Project</Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}

export default CreateModal;
