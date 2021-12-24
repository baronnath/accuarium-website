import * as React from 'react';
import './App.css';
import translator from './translator/translator';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import theme from './theme';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Button from '@mui/material/Button';

function App() {

  const i18n = translator();

  return (
    <ThemeProvider theme={createTheme(theme)}>
        <NavBar/>
        <Hero/>
        <Button color="primary" variant="contained">
          Download
        </Button>
    </ThemeProvider>
  );
}

const styles = {
 
};

export default App;
