import { Box, Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
import SideBar from '../SharedModule/SideBar/sideBar';
import NavBar from '../SharedModule/NavBar/navBar';
const MasterLayOut = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container  sx={{flexDirection:'column'}}>
                <Grid>
                <NavBar/>
                </Grid>
                <Grid container sx={{flexDirection:'row'}}>
                        <SideBar />
                    <Grid>
                        <Outlet />
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default MasterLayOut;
