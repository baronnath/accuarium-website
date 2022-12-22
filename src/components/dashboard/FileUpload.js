import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { 
  Button,
  Grid,
  Paper,
  Typography
} from '@mui/material';
import Icon from '@mdi/react';
import { mdiFish, mdiDramaMasks  } from '@mdi/js';
import InputFile from '../InputFile';
import Alert from '../Alert';
import { Api } from '../../helpers/axios';
import translator from '../../translator/translator';

const FileUpload = () => {

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

  function handleSuccess(res) {
    setAlert(prevAlert => ({
      ...prevAlert,
      message: i18n.t('fileUpload.success'),
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

  function handleUpload(file, target) {
    let api = new Api();
    let data = new FormData();
    data.append('file', file);

    switch (target) {
      case 'species':
        api.uploadSpeciesFile(data)
          .then(res => {
            handleSuccess(res);
          })
          .catch(err => {
            handleError(err);   
          });
        break;
      case 'compatibilities':
        api.uploadCompatibilityFile(data)
          .then(res => {
            handleSuccess(res);
          })
          .catch(err => {
            handleError(err);   
          });
        break;
    
      default:
        break;
    }
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
              path={mdiFish}
              title="Species"
              size={2}
            />
            <Typography variant="h6" component="h1">
              {i18n.t('fileUpload.uploadSpecies')}
            </Typography>
            
            <InputFile file={speciesFile} setFile={setSpeciesFile}/>
            <Button
              variant="contained"
              onClick={() => handleUpload(speciesFile, 'species')}
              style={{ width: '100%', marginTop: 5 }}
            >
              {i18n.t('fileUpload.upload')}
            </Button>

          </Paper>

        </Grid>
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
              path={mdiDramaMasks}
              title="Species"
              size={2}
            />
            <Typography variant="h6" component="h1">
              {i18n.t('fileUpload.uploadCompatibilities')}
            </Typography>
            
            <InputFile file={compatFile} setFile={setCompatFile}/>
            <Button
              variant="contained"
              onClick={() => handleUpload(compatFile, 'compatibilities')}
              style={{ width: '100%', marginTop: 5 }}
            >
              {i18n.t('fileUpload.upload')}
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

export default FileUpload;