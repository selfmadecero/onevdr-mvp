import React from 'react';
import { Typography, Box, Paper } from '@mui/material';
import Sidebar from '../components/layout/Sidebar';
import ConstructionIcon from '@mui/icons-material/Construction';

const Team: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <ConstructionIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            Team Management
          </Typography>
          <Typography variant="body1">
            현재 MVP에서 개발을 진행중입니다. 곧 팀 관리 기능이 추가될 예정입니다.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Team;