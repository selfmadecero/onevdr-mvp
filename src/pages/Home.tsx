import React from 'react';
import { Typography, Container, Grid, Paper, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';

const Home: React.FC = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 12, mb: 6 }}>
          <Typography variant="h1" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
            Welcome to OneVDR
          </Typography>
          <Typography variant="h4" component="h2" gutterBottom align="center" color="textSecondary" sx={{ mb: 6 }}>
            Intelligent Virtual Data Room for Startups
          </Typography>
          
          <Grid container spacing={4} sx={{ mb: 8 }}>
            <Grid item xs={12} md={4}>
              <Paper elevation={0} sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-5px)' } }}>
                <CloudUploadIcon sx={{ fontSize: 80, mb: 3, color: 'primary.main' }} />
                <Typography variant="h5" component="h3" gutterBottom align="center">
                  AI-Powered File Management
                </Typography>
                <Typography variant="body1" align="center">
                  Easily manage documents with automatic classification and tagging.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={0} sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-5px)' } }}>
                <SecurityIcon sx={{ fontSize: 80, mb: 3, color: 'primary.main' }} />
                <Typography variant="h5" component="h3" gutterBottom align="center">
                  Secure Data Storage
                </Typography>
                <Typography variant="body1" align="center">
                  Store important documents safely with top-level security.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={0} sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-5px)' } }}>
                <SpeedIcon sx={{ fontSize: 80, mb: 3, color: 'primary.main' }} />
                <Typography variant="h5" component="h3" gutterBottom align="center">
                  Efficient Fundraising
                </Typography>
                <Typography variant="body1" align="center">
                  Accelerate your fundraising process by streamlining investor communication.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
      
          <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={RouterLink}
              to="/auth"
              sx={{ px: 4, py: 2, fontSize: '1.1rem' }}
            >
              Get Started with OneVDR
            </Button>
          </Box>
        </Container>
      );
};

export default Home;