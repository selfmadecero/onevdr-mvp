import React from 'react';
import { Typography, Box, Grid, Avatar, Paper, Chip } from '@mui/material';
import Sidebar from '../components/layout/Sidebar';

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  skills: string[];
}

const teamMembers: TeamMember[] = [
  {
    name: 'John Doe',
    role: 'CEO',
    avatar: 'https://i.pravatar.cc/150?img=1',
    skills: ['Leadership', 'Strategy', 'Fundraising'],
  },
  {
    name: 'Jane Smith',
    role: 'CTO',
    avatar: 'https://i.pravatar.cc/150?img=2',
    skills: ['AI', 'Machine Learning', 'Cloud Architecture'],
  },
  {
    name: 'Mike Johnson',
    role: 'Lead Developer',
    avatar: 'https://i.pravatar.cc/150?img=3',
    skills: ['React', 'Node.js', 'TypeScript'],
  },
  // Add more team members as needed
];

const Team: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Our Team
        </Typography>
        <Grid container spacing={3}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper elevation={3} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                <Avatar
                  src={member.avatar}
                  alt={member.name}
                  sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
                />
                <Typography variant="h6" gutterBottom>
                  {member.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                  {member.role}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {member.skills.map((skill, skillIndex) => (
                    <Chip
                      key={skillIndex}
                      label={skill}
                      size="small"
                      sx={{ m: 0.5 }}
                    />
                  ))}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Team;