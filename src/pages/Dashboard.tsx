import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';
// import FileUploader from '../components/dashboard/FileUploader';
// import FileList from '../components/dashboard/FileList';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState(auth.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (!user) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
    </Container>
  );
};

export default Dashboard;