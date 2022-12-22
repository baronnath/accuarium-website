import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import translator from '../../translator/translator';

const Dashboard = () => {

  const i18n = translator();

  return (
    <Typography variant="h6" component="h1">
      {i18n.t('dashboard.dashboard')}
    </Typography>
  );
};

export default Dashboard;