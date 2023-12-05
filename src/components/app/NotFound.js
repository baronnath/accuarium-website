import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
} from '@mui/material';
import translator from '../../translator/translator';
import { colors } from '../../theme';

const NotFound = (url) => {

  const i18n = translator();
  const navigate = useNavigate();

  return (
    <Container style={styles.root}  maxWidth="sm">
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        color="#fff"
      >
        <Typography variant="h1" component="h1" color="secondary">
          404
        </Typography>
        <Typography variant="h4" component="h2">
          {i18n.t('notFound.title')}
        </Typography>
        <Typography>
          {i18n.t('notFound.description')}
        </Typography>
         <Button variant="outlined" size="large" color="primary" onClick={() => navigate('/')} style={styles.callToAction}>
          {i18n.t('notFound.callToAction')}
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;

const styles = {
  root: {
    width: '100vw',
    height: '100vh',
  },
  callToAction: {
    marginTop: 30,
  },
};