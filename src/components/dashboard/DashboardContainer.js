import * as React from 'react';
import {
  Box,
  Toolbar,
  Container } from '@mui/material';
import translator from '../../translator/translator';

function DashboardConteniner({ children}) {
  const i18n = translator();
  
  return (
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            { children }
          </Container>
        </Box>
      </Box>
  );
}

export default DashboardConteniner;