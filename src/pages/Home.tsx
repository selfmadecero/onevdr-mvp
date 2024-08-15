import React from 'react';
import { Typography, Container, Grid, Paper, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';

const Home: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center">
        Welcome to OneVDR
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom align="center" color="textSecondary">
        Intelligent Virtual Data Room for Startups
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CloudUploadIcon sx={{ fontSize: 60, mb: 2, color: 'primary.main' }} />
            <Typography variant="h6" component="h3" gutterBottom align="center">
              AI-Powered File Management
            </Typography>
            <Typography variant="body1" align="center">
              Easily manage documents with automatic classification and tagging.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <SecurityIcon sx={{ fontSize: 60, mb: 2, color: 'primary.main' }} />
            <Typography variant="h6" component="h3" gutterBottom align="center">
              Secure Data Storage
            </Typography>
            <Typography variant="body1" align="center">
              Store important documents safely with top-level security.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <SpeedIcon sx={{ fontSize: 60, mb: 2, color: 'primary.main' }} />
            <Typography variant="h6" component="h3" gutterBottom align="center">
              Efficient Fundraising
            </Typography>
            <Typography variant="body1" align="center">
              Accelerate your fundraising process by streamlining investor communication.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mt: 6, mb: 3 }}>
        Get Started with OneVDR
      </Typography>
      <Typography variant="body1" paragraph align="center">
        OneVDR revolutionizes the fundraising process for startups. We provide AI-powered document management, 
        secure data storage, and efficient investor communication tools.
      </Typography>
      <Typography variant="body1" paragraph align="center">
        Start using OneVDR now to streamline your fundraising process and increase your chances of success.
      </Typography>

      <Grid container justifyContent="center" spacing={2} sx={{ mt: 4 }}>
  <Grid item>
    <Button variant="contained" color="primary" size="large" component={RouterLink} to="/login">
      Start for Free
    </Button>
  </Grid>
</Grid>
    </Container>
  );
};

export default Home;