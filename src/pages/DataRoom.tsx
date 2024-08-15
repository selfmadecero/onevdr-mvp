import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import FileList from '../components/dataRoom/FileList';
import FileUploader from '../components/dataRoom/FileUploader';
import { auth } from '../config/firebase';
import { getDocuments } from '../services/firestore';
import { FileData as FileListFileData } from '../components/dataRoom/FileList';

interface FileData {
  id: string;
  originalFileName: string;
  optimizedFileName: string;
  category: string;
  downloadURL: string;
  version: number;
  uploadedAt: Date;
  status: string;
}

const DataRoom: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/login');
      } else {
        fetchFiles();
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchFiles = async () => {
    try {
      const files = await getDocuments('files', [{ field: 'userId', operator: '==', value: auth.currentUser?.uid }]);
      setUploadedFiles(files as FileData[]);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const handleFileUploaded = (fileData: FileData) => {
    setUploadedFiles(prev => [...prev, fileData]);
  };

  const convertToFileListData = (files: FileData[]): FileListFileData[] => {
    return files.map(file => ({
      name: file.originalFileName,
      size: 0, // 실제 파일 크기가 있다면 여기에 추가
      type: '', // 파일 타입 정보가 있다면 여기에 추가
      downloadURL: file.downloadURL,
      uploadedAt: file.uploadedAt
    }));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Data Room
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FileUploader onFileUploaded={handleFileUploaded} />
          </Grid>
          <Grid item xs={12} md={6}>
            <FileList files={convertToFileListData(uploadedFiles)} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DataRoom;