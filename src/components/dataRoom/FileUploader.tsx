import React from 'react';
import { Button } from '@mui/material';

const FileUploader: React.FC = () => {
  return (
    <Button variant="contained" component="label">
      파일 업로드
      <input type="file" hidden />
    </Button>
  );
};

export default FileUploader;