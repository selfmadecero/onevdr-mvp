import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const theme = useTheme();

  const handleLogout = async () => {
    try {
      await signOut(auth);
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
        borderRadius: 0, // 이 줄을 추가합니다
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
          {user ? (
            <>
              <Button 
                color="primary" 
                component={Link} 
                to="/dashboard" 
                startIcon={<DashboardIcon />}
                sx={{ 
                  marginRight: 2,
                  fontWeight: 'medium',
                }}
              >
                Dashboard
              </Button>
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
            </>
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
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;