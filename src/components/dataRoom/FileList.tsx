import React from 'react';
import { Typography, List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

interface FileData {
  name: string;
  size: number;
  type: string;
  downloadURL: string;
  uploadedAt: Date;
}

const FileList: React.FC<{ files: FileData[] }> = ({ files }) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Paper elevation={3} sx={{ mt: 3, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Uploaded Files
      </Typography>
      {files.length === 0 ? (
        <Typography variant="body2" color="textSecondary">
          No files uploaded yet.
        </Typography>
      ) : (
        <List>
          {files.map((file, index) => (
            <ListItem key={index} button component="a" href={file.downloadURL} target="_blank" rel="noopener noreferrer">
              <ListItemIcon>
                <InsertDriveFileIcon />
              </ListItemIcon>
              <ListItemText 
                primary={file.name}
                secondary={`${formatFileSize(file.size)} • Uploaded on ${file.uploadedAt.toLocaleString()}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default FileList;