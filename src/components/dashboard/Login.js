import React, {useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import translator from '../../translator/translator';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { colors } from '../../theme';
import { Api, setHeaders } from '../../helpers/axios';
import Alert from '../Alert';

const Login = () => {

  const [searchParams] = useSearchParams();
  const backTo = searchParams.get('backTo');

  const i18n = translator();
  const navigate = useNavigate();

  const [alert, setAlert] = useState({
    message: null,
    type: null,
    open: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let params = {
      email: data.get('email'),
      password: data.get('password'),
    };

  Api.login(params)
    .then(async(res) => {
      setAlert(prevAlert => ({
        ...prevAlert,
        message: i18n.t('dashboard.login.success'),
        type: 'success',
        open: true,
      }));

      if(res.data.user.role.name.en != 'admin'){
        setAlert(prevAlert => ({
          ...prevAlert,
          message: i18n.t('dashboard.login.notAdmin'),
          type: 'error',
          open: true,
        }))
        return;
      }

      // Store user
      localStorage.setItem('user', JSON.stringify(res.data.user));

      // Redirect
      if(backTo){
        navigate(backTo);
      }
      navigate('../dashboard');

    })
    .catch(err => {
      console.log('ERROR', err)
      setAlert(prevAlert => ({
        ...prevAlert,
        message: err.response.data ? err.response.data.message : i18n.t('networkError'),
        type: 'error',
        open: true,
      }))          
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {i18n.t('dashboard.login.signIn')}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={i18n.t('dashboard.login.email')}
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={i18n.t('dashboard.login.password')}
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label={i18n.t('dashboard.login.remember')}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {i18n.t('dashboard.login.signIn')}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
              {i18n.t('dashboard.login.forgotPassword')}
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {i18n.t('dashboard.login.signUp')}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Alert
        message={alert.message}
        type={alert.type}
        isOpen={alert.open}
        onClose={() => setAlert(prevAlert => ({
          ...prevAlert,
          open: false,
        }))}
      />
    </Container>
  );
};

export default Login;