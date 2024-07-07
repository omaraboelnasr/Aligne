import { Box, Container, Grid, useMediaQuery, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import SideBar from '../SharedModule/SideBar/sideBar';
import NavBar from '../SharedModule/NavBar/navBar';
const MasterLayOut = () => {
    const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('xl'));
    return (
        <Box sx={{backgroundColor:'#e6f3f861',minHeight: '100vh',display: 'flex', flexDirection: 'column' }}>
        <Container maxWidth="xl" sx={{ flexGrow: 1 ,backgroundColor:'white',display: 'flex', flexDirection: 'column'  }} >
            <Grid  container direction="column">
                <Grid item>
                    <NavBar />
                </Grid>
                <Grid container={isMediumScreen}  >
                    <SideBar />
                    <Grid  sx={{marginTop:20}}>
                        <Outlet />
                    </Grid>
                </Grid>
            </Grid>
        </Container>
        </Box>
    )
}

export default MasterLayOut;
