import React from 'react';
import { Typography, Container } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <footer style={{ marginTop: 'auto', padding: '20px 0', backgroundColor: '#f5f5f5' }}>
      <Container>
        <Typography variant="body2" color="textSecondary" align="center">
          © {new Date().getFullYear()} OneVDR. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;