import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
  useLocation,
  useParams,
} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import theme from './theme';
import { CssBaseline } from '@mui/material/';
import Box from '@mui/material/Box';

import NavBar from './components/NavBar';
import Home from './components/Home';
import Blog from './components/blog/Blog';
import Post from './components/blog/Post';
import SearchSpecies from './components/species/SearchSpecies';
import Species from './components/species/Species';
import Press from './components/Press';
import Subscribe from './components/Subscribe';
import About from './components/About';
import Footer from './components/Footer';
import ThankYou from './components/ThankYou';
import DeleteAccount from './components/DeleteAccount';

import Login from './components/dashboard/Login';
import DashboardContainer from './components/dashboard/DashboardContainer';
import DashboardMenu from './components/dashboard/Menu';
import Dashboard from './components/dashboard/Dashboard';
import Permissions from './components/dashboard/Permissions';
import FileUpload from './components/dashboard/FileUpload';
import Reports from './components/dashboard/Reports';

import PrivacyPolicy from './components/legal/PrivacyPolicy';
import CookiesPolicy from './components/legal/CookiesPolicy';
import LegalNotice from './components/legal/LegalNotice';
import Terms from './components/legal/Terms';

import Redirect from './components/app/Redirect';
import NotFound from './components/app/NotFound';

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

  const RedirectComponent = () => {
    const { screen, id } = useParams(); // Retrieve the params in URL
    const redirectUrl = `accua://${screen}/${id}`; // Generate app URL

    window.location.href = redirectUrl;

    return (
      <Redirect url={redirectUrl}/>
    );
  };

  return (
    <Router>
      <ThemeProvider theme={createTheme(theme)}>
        <CssBaseline/>
        <Routes>
          <Route path="" element={<FrontTemplate />}>
            <Route path="/" element={<Home />} />
            <Route path="blog" element={<Blog />} />
            <Route path="post/:slug" element={<Post />} />
            <Route path="species/:slug" element={<Species />} />
            <Route path="species" element={<SearchSpecies />} />
            <Route path="press" element={<Press />} />
            <Route path="about" element={<About />} />
            <Route path="thankyou" element={<ThankYou />} />

            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="cookies-policy" element={<CookiesPolicy />} />
            <Route path="legal-notice" element={<LegalNotice />} />
            <Route path="terms-and-conditions" element={<Terms />} />

            <Route path="delete-account" element={<DeleteAccount />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<DashboardTemplate />}>
            <Route path="" element={<DashboardRoute><Dashboard /></DashboardRoute>} />
            <Route path="permissions" element={<DashboardRoute><Permissions /></DashboardRoute>} />
            <Route path="file-upload" element={<DashboardRoute><FileUpload /></DashboardRoute>} />
            <Route path="reports" element={<DashboardRoute><Reports /></DashboardRoute>} />
          </Route>
          {/*Redirect to app*/}
          <Route exact path="app/:screen/:id?" element={<RedirectComponent/>} />
          {/*404*/}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
