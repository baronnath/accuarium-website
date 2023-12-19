import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { 
  Button,
  Grid,
  Paper,
  Typography
} from '@mui/material';
import Icon from '@mdi/react';
import { mdiFish, mdiDramaMasks, mdiSitemap } from '@mdi/js';
import InputFile from '../InputFile';
import Alert from '../Alert';
import { Api } from '../../helpers/axios';
import translator from '../../translator/translator';

const Reports = () => {

  const i18n = translator();

  const [speciesFile, setSpeciesFile] = useState(null);
  const [compatFile, setCompatFile] = useState(null);
  const [alert, setAlert] = useState({
    message: null,
    type: null,
    open: false,
  });

  useEffect(() => {
    if(speciesFile) console.log('UPDATED',speciesFile);
  },[speciesFile]);

  function handleSuccess() {
    setAlert(prevAlert => ({
      ...prevAlert,
      message: i18n.t('reports.success'),
      type: 'success',
      open: true,
    }));
  }

  function handleError(err) {
    setAlert(prevAlert => ({
      ...prevAlert,
      message: err.response.data ? err.response.data.message : i18n.t('networkError'),
      type: 'error',
      open: true,
    }));   
  }

  function handleReport(target) {
    let api = new Api();

    switch(target) {
      case 'sitemap':
        sitemapReport(api);
        break;
      default:
        break;
    }
  }

  function sitemapReport(api) {
    api.getSitemapReport()
      .then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data.species.join('\n')]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'species-sitemap-report.csv');
        link.click();
        handleSuccess();
      })
      .catch(err => {
        handleError(err);   
      });
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Icon
              path={mdiSitemap}
              title="sitemap"
              size={2}
            />
            <Typography variant="h6" component="h1">
              {i18n.t('reports.sitemap')}
            </Typography>
            
            <Button
              variant="contained"
              onClick={() => handleReport('sitemap')}
              style={{ width: '100%', marginTop: 5 }}
            >
              {i18n.t('general.download')}
            </Button>

          </Paper>

        </Grid>
      </Grid>
      <Alert
        message={alert.message}
        type={alert.type}
        isOpen={alert.open}
        onClose={() => setAlert(prevAlert => ({
          ...prevAlert,
          open: false,
        }))}
      />
    </>
  );
};

export default Reports;