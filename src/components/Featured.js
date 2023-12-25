import React from 'react';
import { Link, Box, Button, Typography } from '@mui/material';
import videoSource from '../assets/video/pexels-african-aquarium.mp4';
import { useTheme } from '@mui/material/styles';
import { useWindowDimensions, gAnalyticsEvent } from '../helpers/global';
import Subscribe from './Subscribe';
import DowndloadAppButtons from './DowndloadAppButtons';
import translator from '../translator/translator';
import theme, { colors } from '../theme';

const Featured = () => {

  const i18n = translator();

  const theme = useTheme();
  const { height, width } = useWindowDimensions();

   return (
    <Box sx={styles.container}>
      <Typography variant="h6" component="h4" sx={styles.overtitle}>
        {i18n.t('featured.overtitle')}
      </Typography>
      <Box sx={styles.row}>
        
        <Box sx={styles.videoFrame}>
          <video
            autoPlay
            muted
            loop
            style={styles.video} //object-fit:cover
          >
            <source src={videoSource} type="video/mp4" />
          </video>
        </Box>

        <Box
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          color="#fff"
          sx={styles.textContainer}
        >
          <Typography variant="h3" component="h3" sx={styles.title}>
            {i18n.t('featured.title')}
          </Typography>
          <Typography variant="h6" component="h3" sx={styles.subtitle}>
            {i18n.t('featured.subtitle')}
          </Typography>
          <DowndloadAppButtons  size={{xs: '60%', sm:'40%'}}/>
        </Box>
      </Box>
    </Box>
  );

};

export default Featured;

const styles = {
  container: {
    mt: 10,
  },
  row: {
    mt: 4,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  overtitle: {
    textAlign: 'center',
  },
  videoFrame: {
    display: 'flex',
    flex: 4,
    position: 'relative',
    justifyContent: {xs: 'center', sm:'flex-end'},
  },
  video: {
    border: '.4vh solid #fff',
    borderRadius: '2.5vh',
    width: 160,
    height: '100%', 
    objectFit: 'fit',
    overflow: 'hidden'
  },
  title: {
    width: '100%',
    color: colors.secondary,
    fontSize: 30,
  },
  subtitle: {
    width: '100%',
    fontSize: 16,
    marginBottom: {xs: 4},
  },
  textContainer: {
    flex: 6,
    textAlign: {xs: 'center', sm:'left'}
  },
  downloadButtonContainer: {
    width: '50%',
    alignSelf: {xs: 'center', sm:'start'},
    mt: 1,
  },
  downloadButton: {
    maxWidth: '100%',
    height: 'auto',
  },
  callToAction: {
    fontWeight: 'bold',
    color: colors.white,
  }
}

