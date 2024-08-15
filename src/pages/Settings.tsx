import React, { useState } from 'react';
import { Typography, Box, Paper, Switch, FormControlLabel, Button, Divider, TextField, Grid } from '@mui/material';
import Sidebar from '../components/layout/Sidebar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SecurityIcon from '@mui/icons-material/Security';
import LanguageIcon from '@mui/icons-material/Language';

const Settings: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [language, setLanguage] = useState('English');

  const handleSave = () => {
    // Implement save functionality
    console.log('Settings saved');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Settings
        </Typography>
        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Notifications
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications}
                      onChange={(e) => setNotifications(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Enable Notifications"
                />
              </Box>
              <Divider sx={{ my: 3 }} />
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Appearance
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={darkMode}
                      onChange={(e) => setDarkMode(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Dark Mode"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Security
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={twoFactor}
                      onChange={(e) => setTwoFactor(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Enable Two-Factor Authentication"
                />
              </Box>
              <Divider sx={{ my: 3 }} />
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Language
                </Typography>
                <TextField
                  select
                  fullWidth
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="English">English</option>
                  <option value="French">한국어</option>
                </TextField>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3, textAlign: 'right' }}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Settings;