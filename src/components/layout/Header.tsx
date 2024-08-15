import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { AuthContext } from '../../context/AuthContext';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { user, loading, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      logout(); // AuthContext의 logout 함수 호출
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleLogoClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <AppBar 
      position="fixed" 
      elevation={0} 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        borderRadius: 0,
      }}
    >
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            cursor: 'pointer',
            fontWeight: 'bold',
            letterSpacing: '0.5px',
            color: theme.palette.primary.main,
          }} 
          onClick={handleLogoClick}
        >
          OneVDR
        </Typography>
        <Box>
          {!loading && (
            user ? (
              <Button 
                color="primary" 
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
                sx={{ 
                  fontWeight: 'medium',
                }}
              >
                Logout
              </Button>
            ) : (
              <Button 
                color="primary" 
                component={Link} 
                to="/auth"
                startIcon={<LoginIcon />}
                sx={{ 
                  fontWeight: 'medium',
                }}
              >
                Sign In
              </Button>
            )
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;