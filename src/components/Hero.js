import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import heroVideo from '../assets/video/pexels-water-bg.mp4';
import { useTheme } from '@mui/material/styles';
import { useWindowDimensions } from '../helpers/global';

const Hero = () => {

  const theme = useTheme();
  const { height, width } = useWindowDimensions();

   return (
    <section style={styles.root}>
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
        >
          <Typography variant="h3" component="h1" style={styles.title}>
            Plan your tank like a pro
          </Typography>
          <Button color="primary" variant="contained">
            Download
          </Button>
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
    height: "100%",
    width: "100%",
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
    // paddingBottom: theme.spacing(4),
  }
}

