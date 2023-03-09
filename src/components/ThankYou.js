import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { colors } from '../theme';
import translator from '../translator/translator';
import Social from './Social';

const ThankYou = () => {

  const i18n = translator();

  return (
    <div style={styles.overlay}>
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        color="#fff"
        sx={styles.textContainer}
      >
        <Typography variant="h3" component="h1" style={{...styles.fullWidth, ...styles.title}}>
          {i18n.t('thankYou.title')}
        </Typography>
        
        <Typography style={styles.fullWidth}>
          {i18n.t('thankYou.description')}
        </Typography>
        <Typography variant="h6" component="h2" style={{...styles.fullWidth, ...styles.subtitle}}>
          {i18n.t('thankYou.subtitle')}
        </Typography> 

        <Social color={colors.white} align={'left'} style={styles.social}/>
      </Box>
    </div>
  );
};

export default ThankYou;

const styles = {
  overlay: {
    width: '100vw',
    height: '100vh',
  },
  fullWidth: {
    width: '100%', 
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
  social: {
    marginTop: 20,
  }
}