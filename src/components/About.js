import React from 'react';
import { Box, Button, Typography, Container, Avatar } from '@mui/material';
import { colors } from '../theme';
import translator from '../translator/translator';
import Social from './Social';

const About = () => {

  const i18n = translator();

  return (
    <Container sx={{ marginTop:5 }} maxWidth="sm">
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
          {i18n.t('about.behind.title')}
        </Typography>
        <Box sx={styles.behindContainer}>
          <Box sx={styles.behindColumn}>
            <Avatar
              alt="Natan Morote - accuarium creator"
              src={require('../assets/img/natan-morote.jpg')}
              sx={{ width: 120, height: 120}}
            />
            <Typography style={{marginTop: 30}} color={colors.secondary}>
              <b>{i18n.t('about.behind.1.title')}</b>
            </Typography>
            <Typography style={styles.fullWidth}>
              {i18n.t('about.behind.1.description')}
            </Typography>
          </Box>
          <Box style={styles.behindColumn}>
            <Avatar
              alt="Natan Morote - accuarium creator"
              src={require('../assets/img/javier-rubio.jpg')}
              sx={{ width: 120, height: 120}}
            />
            <Typography style={{marginTop: 30}} color={colors.secondary}>
              <b>{i18n.t('about.behind.2.title')}</b>
            </Typography>
            <Typography style={styles.fullWidth}>
              {i18n.t('about.behind.2.description')}
            </Typography>
          </Box>
        </Box>

        <Typography variant="h3" component="h1" style={{...styles.fullWidth, ...styles.title}}>
          {i18n.t('about.mission.title')}
        </Typography>
        <Typography style={styles.fullWidth}>
          {i18n.t('about.mission.text.1')}
        </Typography>
        <Typography style={styles.fullWidth}>
          {i18n.t('about.mission.text.2')}
        </Typography>

        <Typography variant="h3" component="h1" style={{...styles.fullWidth, ...styles.title}}>
          {i18n.t('about.vision.title')}
        </Typography>
        <Typography style={styles.fullWidth}>
          {i18n.t('about.vision.text.1')}
        </Typography>
        <Typography style={styles.fullWidth}>
          {i18n.t('about.vision.text.2')}
        </Typography>

        <Social color={colors.white} align={'left'} style={styles.social}/>
      </Box>
    </Container>
  );
};

export default About;

const styles = {
  // overlay: {
  //   width: '100vw',
  //   height: '100vh',
  // },
  fullWidth: {
    width: '100%', 
  },
  behindContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: '30px',
    flexWrap: {xs: 'wrap', sm: 'nowrap'},
  },
  behindColumn: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  title: {
    marginTop: 50,
    marginBottom: 20,
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