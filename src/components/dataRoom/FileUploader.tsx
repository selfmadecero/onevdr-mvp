import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, LinearProgress, Paper, Grid } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { handleFileUpload } from '../../services/aiFileManager';

interface UploadingFile {
  file: File;
  progress: number;
  status: 'uploading' | 'done' | 'error';
  errorMessage?: string;
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

    newFiles.forEach(file => uploadFile(file));
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

      const fileData = await handleFileUpload(uploadingFile.file);

      setUploadingFiles(prev => 
        prev.map(f => f.file === uploadingFile.file ? { ...f, status: 'done', progress: 100 } : f)
      );

      onFileUploaded(fileData);

    } catch (error) {
      console.error("Error uploading file:", error);
      let errorMessage = "Unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setUploadingFiles(prev => 
        prev.map(f => f.file === uploadingFile.file ? { ...f, status: 'error', errorMessage } : f)
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
          {isDragActive ? "Great! Drop your files here" : "Drag and drop files here, or click to browse"}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Upload PDF files (max 50MB each). You can upload up to 10 files at once.
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
                   file.status === 'done' ? 'Done' : `Error: ${file.errorMessage}`}
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