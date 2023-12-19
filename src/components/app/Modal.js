import React from 'react';
import {
  Modal as Muimodal,
  Button,
  Box,
} from '@mui/material';
import translator from '../../translator/translator';
import { colors } from '../../theme';

const Modal = ({isOpen, setOpen, children}) => {
  const i18n = translator();

  return (
    <Muimodal
      open={isOpen}
      onClose={() => setOpen(false)}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, textAlign: 'center' }}>
        {children}
        <Button
          onClick={() => setOpen(false)}
          sx={{mt: 2}}
        >
          {i18n.t('general.close')}
        </Button>
      </Box>
    </Muimodal>
  );
};

export default Modal;

const style = {
  backgroundColor: colors.text,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  // border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};