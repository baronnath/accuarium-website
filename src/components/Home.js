import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Typography, Box, Paper } from '@mui/material';
import Hero from './Hero';
import MastodonFeed from './MastodonFeed';
import FAQ from './FAQ';
import Icon from '@mdi/react';
import { mdiShieldStarOutline, mdiMicroscope, mdiEarth, mdiHeart, mdiThumbUp, mdiShareVariant, mdiHeartCircle } from '@mdi/js';
import translator from '../translator/translator';
import { colors } from '../theme';

const Home = () => {

  const i18n = translator();

  const gridContent = [
    {
      icon: mdiShieldStarOutline,
    },
    {
      icon: mdiMicroscope,
    },
    {
      icon: mdiEarth,
    }
  ]

  return (
    <>
      <Hero/>
      <Container>
        <Box
          style={styles.section}
          title={i18n.t('home.section1.title')}
          dark={true}
          id="sectionFeature"
          sx={{ marginY: 6 }}
        >
          <Grid container spacing={2}>
            {
              gridContent.map((item, index) => {
                index++;
                return(
                  <Grid item sx={{ marginY: 3 }} xs={12} sm={4} style={styles.item} key={`home.section1.grid.${index}.alt`}>
                      <Icon
                        path={item.icon}
                        title={i18n.t(`home.section1.grid.${index}.alt`)}
                        size={3}
                      />
                      <Typography sx={{ mt: 1 }}>{i18n.t(`home.section1.grid.${index}.title`)}</Typography>
                  </Grid>
                )
              })
            }
          </Grid>

          <Paper style={styles.sectionContainer} sx={styles.surface}>
            <Icon
              path={mdiHeartCircle}
              title={i18n.t('home.section6.title')}
              size={3}
            />
            <Typography variant="h3" fontSize={36}>{i18n.t('home.section6.title')}</Typography>
            <Typography variant="h5" fontSize={15} fontWeight="bold" color={colors.background} sx={{marginTop: 4}}>{i18n.t('home.section6.subtitle')}</Typography>
            <Typography sx={{marginTop: 1}}>{i18n.t('home.section6.description')}</Typography>
          </Paper>

          <Grid container spacing={2} style={styles.sectionContainer} sx={{ marginTop:10 }}>
            <Grid item xs={12} sm={6} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Box style={styles.bgCircle} sx={{height: {xs:'85vw', sm:'40vw', md:'400px'}, width: {xs:'85vw', sm:'40vw', md:'400px'}}}></Box>
              <Box justifyContent="center" display="flex">
                <img style={{maxWidth:'75%'}} alt="species screenshot" src={require('../assets/img/species-screenshot.png')}/>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} sx={{marginTop: {xs: 5, sm: 0}}}>
              <Typography variant="h3" sx={{textAlign: {xs: 'center', sm: 'left'}}}>{i18n.t('home.section2.title.line1')}<br/>{i18n.t('home.section2.title.line2')}</Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2} style={styles.sectionContainer} sx={{ marginTop:10 }}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h3" sx={{textAlign: {xs: 'center', sm: 'left'}}}>{i18n.t('home.section3.title.line1')}<br/>{i18n.t('home.section3.title.line2')}</Typography>
              <Typography variant="h6" component="h3" sx={{textAlign: {xs: 'center', sm: 'left'}}}>{i18n.t('home.section3.subtitle')}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Box style={styles.bgCircle} sx={{height: {xs:'85vw', sm:'40vw', md:'400px'}, width: {xs:'85vw', sm:'40vw', md:'400px'}}}></Box>
              <Box justifyContent="center" display="flex">
                <img style={{maxWidth:'75%'}} alt="species screenshot" src={require('../assets/img/graphic-tank-species-screenshot.png')}/>
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={2} style={styles.sectionContainer} sx={{ marginTop:20 }}>
            <Grid item xs={12} sm={6} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Box style={styles.bgCircle} sx={{height: {xs:'70vw', sm:'40vw', md:'400px'}, width: {xs:'70vw', sm:'40vw', md:'400px'}}}></Box>
              <Box justifyContent="center" display="flex">
                <img style={{maxWidth:'60%', border: 'solid 1.5px white', borderRadius: 30}} alt="species screenshot" src={require('../assets/img/species-compatibility-issue.png')}/>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h3" sx={{textAlign: {xs: 'center', sm: 'left'}}}>{i18n.t('home.section4.title.line1')}<br/>{i18n.t('home.section4.title.line2')}</Typography>
              <Typography variant="h6" component="h3" sx={{textAlign: {xs: 'center', sm: 'left'}}}>{i18n.t('home.section4.subtitle')}</Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2} style={styles.sectionContainer} sx={{ marginTop:10 }}>
            <Grid item xs={12} sm={6} sx={{marginTop: {xs: 10, sm: 0, md: 30}}}>
              <Typography variant="h3" sx={{textAlign: {xs: 'center', sm: 'left'}}}>{i18n.t('home.section5.title.line1')}</Typography>
              <Typography variant="h6" component="h3" sx={{textAlign: {xs: 'center', sm: 'left'}}}>{i18n.t('home.section5.subtitle')}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} sx={{marginTop: 5}} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', position:'relative', minHeight: '150px'}}>
              <Box style={styles.bgCircle} sx={{height: {xs:'30vw', sm:'30vw', md:'300px'}, width: {xs:'30vw', sm:'30vw', md:'300px'}}}></Box>
              <Box justifyContent="center" display="flex">
                <img style={{maxWidth:'50%'}} alt="species screenshot" src={require('../assets/img/tank-screenshot.png')}/>
              </Box>
              <Icon
                path={mdiHeart}
                title={i18n.t('home.section5.title.line1')}
                size={6}
                style={{position:'absolute', left:'60%', top:'10%' }}
              />
              <Icon
                path={mdiThumbUp}
                title={i18n.t('home.section5.title.line1')}
                size={4}
                style={{position:'absolute', left:'30%', top:'-10%' }}
              />
              <Icon
                path={mdiShareVariant}
                title={i18n.t('home.section5.title.line1')}
                size={12}
                style={{position:'absolute', right:'30%', bottom:'-20%' }}
              />
            </Grid>
          </Grid>

        </Box>
        <Box
          style={styles.section}
          title={i18n.t('news.title')}
          dark={true}
          id="sectionNews"
          sx={{ marginTop:20 }}
        >
          <MastodonFeed/>
        </Box>
        <Box
          style={styles.section}
          title={i18n.t('faq.title')}
          dark={true}
          id="sectionFaq"
          sx={{ marginTop:15
           }}
        >
          <FAQ/>
        </Box>
      </Container>
    </>
  );
};

const styles = {
  section: {
    // height: 500,
  },
  surface: {
    width: {xs: '100%', sm: '60%'},
    marginLeft: {xs: '0%', sm: '20%'},
    marginTop: 10,
    padding: {xs: 2, sm: 5, md: 10},
    backgroundColor: colors.primary,
    flexDirection: 'column',
    textAlign: 'center',
    color: colors.background,
  },
  item: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    display: 'flex',
    alignItems: 'center',
    marginVertical: '5%',
  },
  bgCircle: {
    backgroundColor: colors.primary,
    borderRadius: '50%',
    position: 'absolute',
    zIndex: '-1',
  }
};

export default Home;