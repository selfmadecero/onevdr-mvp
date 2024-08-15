import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, LinearProgress, Paper, Grid } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { uploadFile as uploadFileToStorage } from '../../services/storage';

interface UploadingFile {
  file: File;
  progress: number;
  status: 'uploading' | 'done' | 'error';
}

const FileUploader: React.FC<{ onFileUploaded: (fileData: any) => void }> = ({ onFileUploaded }) => {
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.slice(0, 10).map(file => ({
      file,
      progress: 0,
      status: 'uploading' as const
    }));
    setUploadingFiles(prev => [...prev, ...newFiles]);

    newFiles.forEach(file => uploadFileToStorage(file.file));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxSize: 50 * 1024 * 1024, // 50MB
    maxFiles: 10
  });

  const uploadFile = async (uploadingFile: UploadingFile) => {
    try {
      setUploadingFiles(prev => 
        prev.map(f => f.file === uploadingFile.file ? { ...f, status: 'uploading' } : f)
      );

      const downloadURL = await uploadFileToStorage(uploadingFile.file);

      setUploadingFiles(prev => 
        prev.map(f => f.file === uploadingFile.file ? { ...f, status: 'done', progress: 100 } : f)
      );

      onFileUploaded({
        name: uploadingFile.file.name,
        size: uploadingFile.file.size,
        type: uploadingFile.file.type,
        downloadURL,
        uploadedAt: new Date(),
      });

    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadingFiles(prev => 
        prev.map(f => f.file === uploadingFile.file ? { ...f, status: 'error' } : f)
      );
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, backgroundColor: '#f0f4f8', borderRadius: 4 }}>
      <Box {...getRootProps()} sx={{
        border: '2px dashed #90caf9',
        borderRadius: 2,
        p: 3,
        textAlign: 'center',
        cursor: 'pointer',
        '&:hover': { backgroundColor: '#e3f2fd' }
      }}>
        <input {...getInputProps()} />
        <CloudUploadIcon sx={{ fontSize: 48, color: '#1976d2', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          {isDragActive ? "Drop the files here" : "Drag 'n' drop files here, or click to select files"}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Only PDF files up to 50MB are allowed. Maximum 10 files at once.
        </Typography>
      </Box>

      {uploadingFiles.length > 0 && (
        <Grid container spacing={2} sx={{ mt: 3 }}>
          {uploadingFiles.map((file, index) => (
            <Grid item xs={12} key={index}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" sx={{ flexGrow: 1, mr: 2 }}>
                  {file.file.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {file.status === 'uploading' ? 'Uploading...' :
                   file.status === 'done' ? 'Done' : 'Error'}
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={file.progress} 
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Paper>
  );
};

export default FileUploader;