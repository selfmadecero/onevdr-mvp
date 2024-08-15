import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
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
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" gutterBottom>
          Welcome to OneVDR
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 3 }}>
          Sign in or create an account to get started
        </Typography>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleGoogleAuth}
          startIcon={<GoogleIcon />}
          size="large"
        >
          Continue with Google
        </Button>
      </Box>
    </Container>
  );
};

export default Auth;