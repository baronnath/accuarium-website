import React, {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  FormGroup,
  Box,
  Button,
  Typography,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import Alert from './Alert';
import translator from '../translator/translator';
import validator from '../validators/subscribe';
import { Api } from '../helpers/axios';
import subscribe from '../validators/subscribe';
import theme, { colors } from '../theme';


const Subscribe = () => {

  const i18n = translator();
  const locale = navigator.language.split('-').shift();
  const navigate = useNavigate();

  const [alert, setAlert] = useState({
    message: null,
    type: null,
    open: false,
  });

  const [subscriber, setSubscriber] = useState(initiateSubscriber());

  function initiateSubscriber() {
    return {
      values: {
        email: '',
        policy: '',
      },
      errors: {
        email: '',
        policy: '',
      }
    };
  }

  function handleChange(e) {
    const { name, value: val, type } = e.target;

    let value = val;
    if(type == 'checkbox') {
      value = e.target.checked;
    }

    setSubscriber(prevSubscriber => ({
      ...prevSubscriber,
      values: { 
        ...prevSubscriber.values,
        [name]: value
      }
    }));
  }

  function handleSubmit() {
    console.log('subscriber',subscriber);
    const validation = validator(subscriber);
    console.log('validation',validation);
    
    if (validation !== false) {
      setSubscriber(prevSubscriber => ({
        ...prevSubscriber,
        errors: {
          email: validation.email && i18n.t(validation.email),
          policy: validation.policy && i18n.t(validation.policy),
        }
      }));

      return;
    }

    let params = {
      email: subscriber.values.email,
      locale: locale,
    };

    Api.createLead(params)
    .then(res => {
      setAlert(prevAlert => ({
        ...prevAlert,
        message: i18n.t('subscribe.success'),
        type: 'success',
        open: true,
      }));
      setSubscriber(initiateSubscriber()); // Reset form
      navigate('/thankyou', { replace: true });
    })
    .catch(err => {
      setAlert(prevAlert => ({
        ...prevAlert,
        message: err.response.data ? err.response.data.message : i18n.t('networkError'),
        type: 'error',
        open: true,
      }))          
    });
  };

  return (
    <>

      <form>
        <Box style={styles.box}>
          <FormControl error={!!subscriber.errors.email}>
            <InputLabel htmlFor="email">{i18n.t('subscribe.email.label')}</InputLabel>
            <Input
              id="email"
              name="email"
              aria-describedby="email-helper"
              onChange={handleChange}
              value={subscriber.values.email}
            />
            <FormHelperText id="email-helper">
              {subscriber.errors.email ? subscriber.errors.email : i18n.t('subscribe.email.helper')}
            </FormHelperText>
          </FormControl>
        </Box>

        <FormGroup>
          <FormControl error={!!subscriber.errors.policy}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleChange}
                  checked={subscriber.values.policy}
                  name="policy"
                  size="small"
                />
              }
              label={<Typography style={styles.checkboxText}>{i18n.t('subscribe.policy.label')}</Typography>}
              aria-describedby="policy-helper"
              sx={{marginTop: '15px'}}
            />
            <FormHelperText id="policy-helper">
              {subscriber.errors.policy && subscriber.errors.policy}
            </FormHelperText>
          </FormControl>
        </FormGroup>
        
        <Box style={styles.box}>
          <Button variant="contained" size="large" color="primary" onClick={handleSubmit} style={styles.callToAction}>
            {i18n.t('prelaunch.hero.callToAction')}
          </Button>
        </Box>
      </form>

      {/*
      <Box style={{marginTop: 80}}>
        <Typography>{i18n.t('subscribe.description')}</Typography>
      </Box>
      */}

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

const styles = {
  container: {
    paddingTop: 120,
  },
  box: {
    marginTop: 30,
  },
  checkboxText: {
    fontSize: 12,
  },
  callToAction: {
    fontWeight: 'bold',
    color: colors.white,
  }
};

export default Subscribe;