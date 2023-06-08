import React from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
} from '@mui/material';
import translator from '../../translator/translator';
import { colors } from '../../theme';

const Redirect = (url) => {

  const i18n = translator();

  return (
    <Container style={styles.root}>
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        color="#fff"
      >
        <Typography variant="h6" component="h1">
          {i18n.t('redirect.redirecting')}
        </Typography>
        <Button onClick={() => window.location.href = url}>
          {i18n.t('redirect.openApp')}
        </Button>
      </Box>
    </Container>
  );
};

export default Redirect;

const styles = {
  root: {
    width: '100vw',
    height: '100vh',
  },
};