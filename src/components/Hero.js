import React from 'react';
import { Link, Box, Button, Typography } from '@mui/material';
import heroVideo from '../assets/video/pexels-water-bg.mp4';
import { useTheme } from '@mui/material/styles';
import { useWindowDimensions, gAnalyticsEvent } from '../helpers/global';
import Subscribe from './Subscribe';
import DowndloadAppButtons from './DowndloadAppButtons';
import translator from '../translator/translator';
import theme, { colors } from '../theme';

const Hero = () => {

  const i18n = translator();

  const theme = useTheme();
  const { height, width } = useWindowDimensions();

   return (
    <section style={styles.root} id="section0">
      <video
        autoPlay
        muted
        loop
        style={styles.video} //object-fit:cover
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
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
          <Typography variant="h3" component="h1" sx={styles.title}>
            {i18n.t('hero.title')}
          </Typography>
          <Typography variant="h6" component="h3" sx={styles.subtitle}>
            {i18n.t('hero.subtitle')}
          </Typography>
          <DowndloadAppButtons size={{xs: '70%', sm:'30%', md: '25%', xl:'15%'}}/>


          {/*<Typography variant="h3" component="h1" style={styles.title}>
            {i18n.t('prelaunch.hero.title')}
          </Typography>
          <Subscribe/>*/}
        </Box>
      </div>
    </section>
  );

};

export default Hero;

const styles = {
  root: {
    width: '100vw',
    height: '100vh',
  },
  video: {
    height: "100vh",
    width: "calc(100vw - (100vw - 100%))",
    objectFit: "cover"
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    textAlign: {xs: 'left', sm:'center'},
    width: '100%',
  },
  subtitle: {
    textAlign: {xs: 'left', sm:'center'},
    width: '100%',
    marginBottom: {xs: 4, md:20},
    paddingLeft: {md:'20%'},
    paddingRight: {md:'20%'},
  },
  textContainer: {
    textAlign: 'left',
    px: 5,
  },
  callToAction: {
    fontWeight: 'bold',
    color: colors.white,
  }
}

