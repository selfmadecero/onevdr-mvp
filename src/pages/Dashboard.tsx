import React, { useContext } from 'react';
import { Typography, Container, Grid, Paper, Button, Box, CircularProgress } from '@mui/material';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import AuthContext from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <CircularProgress />;
  }

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              <Typography variant="h6" component="h2" gutterBottom>
                Recently Uploaded Files
              </Typography>
              {/* <FileList /> */}
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              <Typography variant="h6" component="h2" gutterBottom>
                File Upload
              </Typography>
              {/* <FileUploader /> */}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};


export default Dashboard;