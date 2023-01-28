import React from 'react';
import { Snackbar, Alert as Muialert } from '@mui/material';

export default function Alert({message, type = "info", isOpen = false, onClose = null}) {

  const handleClose = (event, reason) => {
    if(onClose)
      onClose();
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      style={{zIndex: 10000}}
    >
      <Muialert severity={type} onClose={handleClose}>{message}</Muialert>
    </Snackbar>
  );
}
