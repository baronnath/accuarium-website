import React from 'react';
import {
  Box,
  CircularProgress,
} from '@mui/material';

const Spinner = (url) => {

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 500 + 'px' }}>
      <CircularProgress />
    </Box>
  );
};

export default Spinner;