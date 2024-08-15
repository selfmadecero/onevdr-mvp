import React from 'react';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';

const Auth: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (error) {
      console.error('Google authentication failed:', error);
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 12, mb: 4 }}>
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 4,
          borderRadius: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Typography component="h1" variant="h4" gutterBottom fontWeight="bold">
          Welcome to OneVDR
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 4 }}>
          Sign in or create an account to get started
        </Typography>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleGoogleAuth}
          startIcon={<GoogleIcon />}
          size="large"
          sx={{
            borderRadius: 50,
            padding: '12px 0',
            fontWeight: 'bold',
            textTransform: 'none',
            fontSize: '1rem',
          }}
        >
          Continue with Google
        </Button>
      </Paper>
    </Container>
  );
};

export default Auth;