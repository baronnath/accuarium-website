import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
  useLocation
} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import theme from './theme';
import { CssBaseline } from '@mui/material/';
import Box from '@mui/material/Box';

import NavBar from './components/NavBar';
import Home from './components/Home';
import Press from './components/Press';
import Subscribe from './components/Subscribe';
import Footer from './components/Footer';

import Login from './components/dashboard/Login';
import DashboardContainer from './components/dashboard/DashboardContainer';
import DashboardMenu from './components/dashboard/Menu';
import Dashboard from './components/dashboard/Dashboard';
import FileUpload from './components/dashboard/FileUpload';

import PrivacyPolicy from './components/legal/PrivacyPolicy';
import CookiesPolicy from './components/legal/CookiesPolicy';
import LegalNotice from './components/legal/LegalNotice';
import Terms from './components/legal/Terms';

import translator from './translator/translator';

function App() {

  const i18n = translator();

  const FrontTemplate = () => {
    return (
      <>
        <NavBar/>
        <Outlet />
        <Footer />
      </>
    );
  }

  const DashboardTemplate = () => {
    return (
      <Box sx={{ display: 'flex' }}>
        <DashboardMenu/>
        <DashboardContainer>
          <Outlet />
        </DashboardContainer>
        {/* <Footer /> */}
      </Box>
    );
  };

  // Protected route (only admin access)
  const DashboardRoute = ({ children }) => {
    const { pathname } = useLocation();
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || user.role.name.en != 'admin') {
      return <Navigate to={`/login?backTo=${pathname}`} replace />;
    }
    return children;
  };

  return (
    <Router>
      <ThemeProvider theme={createTheme(theme)}>
        <CssBaseline/>
        <Routes>
          <Route path="" element={<FrontTemplate />}>
            <Route path="/" element={<Home />} />
            <Route path="subscribe" element={<Subscribe />} />
            <Route path="press" element={<Press />} />

            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="cookies-policy" element={<CookiesPolicy />} />
            <Route path="legal-notice" element={<LegalNotice />} />
            <Route path="terms-and-conditions" element={<Terms />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<DashboardTemplate />}>
            <Route path="" element={<DashboardRoute><Dashboard /></DashboardRoute>} />
            <Route path="file-upload" element={<DashboardRoute><FileUpload /></DashboardRoute>} />
          </Route>
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
