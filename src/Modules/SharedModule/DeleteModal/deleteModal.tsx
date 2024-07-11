import { Box, Button, Modal, Typography } from '@mui/material';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { ApiContext } from '../../../context/apiContext';

const styleDelete = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const DeleteModal = ({openDelete,handleCloseDelete,handleDeleteProject}) => {

    return (
        <>
        <Modal
                open={openDelete}
                onClose={handleCloseDelete}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleDelete}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Delete Project
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Are you sure to delete this project
                    </Typography>
                    <Box sx={{ marginTop: 3, display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="contained" color="error" onClick={handleDeleteProject}>Delete</Button>
                        <Button sx={{ marginLeft: 2 }} variant="contained" onClick={handleCloseDelete}>Cancel</Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}

export default DeleteModal;
