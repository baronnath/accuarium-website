import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useWindowDimensions, gAnalyticsEvent } from '../helpers/global';
import translator from '../translator/translator';
import theme, { colors } from '../theme';

const DowndloadAppButtons = ({ size }) => {

  const i18n = translator();

  const theme = useTheme();
  const { height, width } = useWindowDimensions();

  const styles = {
    downloadButtonsContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    downloadButtonContainer: {
      width: size,
      alignSelf: {xs:'start', sm:'center'},
    },
    downloadButton: {
      maxWidth: '100%',
      height: 'auto',
    },
  }

   return (
    <Box sx={styles.downloadButtonsContainer}>
      <Box sx={styles.downloadButtonContainer}>
        <a href={i18n.t('appStore.href')} onClick={() => gAnalyticsEvent('appStoreClick')}>
          <img style={styles.downloadButton} alt={i18n.t('appStore.alt')} src={require('../assets/img/appstore/' + i18n.t('appStore.src'))}/>
        </a>
      </Box>
      <Box sx={styles.downloadButtonContainer}>
        <a href={i18n.t('googlePlay.href')} onClick={() => gAnalyticsEvent('playStoreClick')}>
          <img style={styles.downloadButton} alt={i18n.t('googlePlay.alt')} src={i18n.t('googlePlay.src')}/>
        </a>
      </Box>
    </Box>
  );

};

export default DowndloadAppButtons;



