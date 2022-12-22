import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import translator from '../translator/translator';
import { colors } from '../theme';

const Press = () => {

  const i18n = translator();

  return (
    <Typography variant="h6" component="h1">
      {i18n.t('press')}
    </Typography>
  );
};

export default Press;