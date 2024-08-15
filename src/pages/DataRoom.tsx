import React from 'react';
import { Typography, Box } from '@mui/material';
import Sidebar from '../components/layout/Sidebar';
import FileList from '../components/dataRoom/FileList';
import FileUploader from '../components/dataRoom/FileUploader';

const DataRoom: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Data Room
        </Typography>
        <FileUploader />
        <FileList />
      </Box>
    </Box>
  );
};

export default DataRoom;