import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';
import Sidebar from '../components/layout/Sidebar';
import FileList from '../components/dataRoom/FileList';
import FileUploader from '../components/dataRoom/FileUploader';

interface FileData {
  name: string;
  size: number;
  type: string;
  downloadURL: string;
  uploadedAt: Date;
}

const DataRoom: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileData[]>([]);

  const handleFileUploaded = (fileData: FileData) => {
    setUploadedFiles(prev => [...prev, fileData]);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Data Room
        </Typography>
        <FileUploader onFileUploaded={handleFileUploaded} />
        <FileList files={uploadedFiles} />
      </Box>
    </Box>
  );
};

export default DataRoom;