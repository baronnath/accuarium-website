// src/theme.js

import color from 'color';

export const colors = {
  primary: '#00bcba',
  accent: '#ff9300',
  secondary: '#ff9300',
  terciary: '#04decf',
  quaternary: '#04aad4',
  error: '#fd063c',
  notification: '#ff9300',
  text: '#111111',
  lightText: '#969696',
  background: '#121212',
  placeholder: color('#000000').alpha(0.54).rgb().string(),
  disabled: color('#ffffff').alpha(0.2).rgb().string(),
  transparent: color('#000000').alpha(0).rgb().string(),
  white: '#fff',
};

const aleo = [
  'Aleo',
  'serif',
].join(',');

const theme = {
  palette: {
    mode: 'dark',
    primary: {
      main: colors.primary
    },
    secondary: {
      main: colors.secondary
    },
    // background: {
    //   default: '#00bcba',
    //   paper: '#00bcba',
    // },
    // text: {
    //   primary: '#fff',
    //   secondary: '#fff',
    // },
  },
  typography: {
    fontFamily: [
      'Montserrat',
      'Roboto',
      '"Helvetica Neue"',
      'sans-serif',
    ].join(','),
    h1: {
      fontFamily: aleo
    },
    h2: {
      fontFamily: aleo
    },
    h3: {
      fontFamily: aleo
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
        },
      },
    },
  },
};



export default theme;