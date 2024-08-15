import React from 'react';
import { Typography, Box, Paper } from '@mui/material';
import Sidebar from '../components/layout/Sidebar';
import SettingsIcon from '@mui/icons-material/Settings';

const Settings: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <SettingsIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            Settings
          </Typography>
          <Typography variant="body1">
            현재 MVP에서 개발을 진행중입니다. 곧 설정 기능이 추가될 예정입니다.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Settings;