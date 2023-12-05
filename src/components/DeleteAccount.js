import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { colors } from '../theme';
import translator from '../translator/translator';

import Social from './Social';

const DeleteAccount = () => {

  const i18n = translator();
  const locale = navigator.language.split('-').shift();
  const navigate = useNavigate();

  return (
    <Container style={styles.overlay} maxWidth="sm">
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="left"
        color="#fff"
        sx={styles.textContainer}
      >
        <Typography variant="h3" component="h1" style={{...styles.fullWidth, ...styles.title}}>
          {i18n.t('deleteAccount.title')}
        </Typography>
        
        <Typography style={styles.fullWidth}>
          {i18n.t('deleteAccount.description')}
        </Typography>
        <Typography variant="h6" component="h2" style={{...styles.fullWidth, ...styles.subtitle}}>
          {i18n.t('deleteAccount.subtitle')}
        </Typography>
        <Button variant="outlined" size="large" color="secondary" onClick={() => navigate('/app/profile')} style={styles.callToAction}>
          {i18n.t('deleteAccount.submit')}
        </Button>
      </Box>

      <Social color={colors.white} align={'left'} style={styles.social}/>
    </Container>
  );
};

export default DeleteAccount;

const styles = {
  overlay: {
    width: '100vw',
    height: '100vh',
  },
  fullWidth: {
    // width: '100%', 
  },
  title: {
    marginBottom: 50,
  },
  subtitle: {
    color: colors.secondary,
    fontWeight: 'bold',
  },
  textContainer: {
    textAlign: 'left',
    px: 5,
  },
  callToAction: {
    marginTop: 20,
  },
  social: {
    marginTop: 20,
  }
}