import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, useTheme, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Data Room', icon: <FolderIcon />, path: '/data-room' },
    { text: 'Team', icon: <PeopleIcon />, path: '/team' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRight: 'none',
          boxShadow: '0 0 15px rgba(0, 0, 0, 0.05)',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box sx={{ mt: 8 }} /> {/* Add space at the top for the header */}
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            sx={{
              my: 0.5,
              mx: 1,
              borderRadius: 2,
              backgroundColor: location.pathname === item.path ? theme.palette.primary.main : 'transparent',
              color: location.pathname === item.path ? theme.palette.common.white : theme.palette.text.primary,
              '&:hover': {
                backgroundColor: location.pathname === item.path 
                  ? theme.palette.primary.dark 
                  : theme.palette.action.hover,
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;