// src/components/NavBar.js

import * as React from 'react';
import { useLocation  } from "react-router-dom";
import { Link as AnchorLink, animateScroll as scroll } from "react-scroll";
import { AppBar, Typography, Box, Toolbar, IconButton, Menu, MenuItem, Container, Button, Link } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
import Icon from '@mdi/react'
import { mdiDotsVertical as menu } from '@mdi/js'
import translator from '../translator/translator';
import { colors } from '../theme';

const i18n = translator();

// Home menu
const homePages = [{ 
      label: i18n.t('menu.feature'),
      ref: 'sectionFeature',
    },
    { 
      label: i18n.t('menu.news'),
      ref: 'sectionNews',
    },
    { 
      label: i18n.t('menu.faq'),
      ref: 'sectionFaq',
    }
  ];

// Web menu (rest of pages)
const webPages = [{
      label: i18n.t('menu.home'),
      ref: '/',
    },
    { 
      label: i18n.t('menu.blog'),
      ref: '/blog',
    },
    { 
      label: i18n.t('menu.species'),
      ref: '/species',
    },
    { 
      label: i18n.t('menu.about'),
      ref: '/about',
    }
  ];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const location = useLocation();
  const isHome = location.pathname == '/';

  let pages = homePages;

  if(!isHome){
    pages = webPages;
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" style={styles.appbar} elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters >

          <Box  sx={{ flexGrow: 1 }} onClick={() => scroll.scrollToTop()}>
            <Box  sx={{ mr: 2, width: {xs: '50%', sm: '25%', md: '30%'} }}>
              <Link href="/">
                <img style={styles.logo} alt="accuarium" src={require('../assets/img/logo-icon-text.png')}/>
              </Link>
            </Box>
          </Box>

          {/* Mobile */}
          <Box sx={styles.boxMobile}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              style={{color: colors.white}}
            >
              <Icon path={menu} title="menu" size={1} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                  { isHome ?
                      <AnchorLink
                        key={page.label}
                        activeClass="active"
                        to={page.ref}
                        spy={true}
                        smooth={'easeInOutQuad'}
                        offset={-30}
                        duration={1000}
                        onClick={handleCloseNavMenu}
                      >
                        {page.label}
                      </AnchorLink>
                    :
                      <Link href={page.ref}>{page.label}</Link>
                  }
                  {/* <Typography textAlign="center">{page}</Typography> */}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Desktop */}
          <Box sx={styles.desktopBox}>
            {pages.map((page) => (
              <Button
                key={page.label}
                sx={{ textTransform: 'none', my: 2, mx: 1, color: 'white', display: 'block' }}
              >
                { isHome ?
                    <AnchorLink
                      activeClass="active"
                      to={page.ref}
                      spy={true}
                      smooth={'easeInOutQuad'}
                      offset={-30}
                      duration={1000}
                      onClick={handleCloseNavMenu}
                    >
                      {page.label}
                    </AnchorLink>
                  :
                  <Link href={page.ref}>{page.label}</Link>
                }
              </Button>
            ))}
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;

const styles = {
  appbar: {
    position: 'absolute',
    top: 0,
    left:0,
    backgroundColor: 'transparent',
    boxShadow: 'none',
    zIndex: 9999,
  },
  logo: { 
    width: '100%',
  },
  desktopBox: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    display: { xs: 'none', md: 'flex' },
  },
  boxMobile: { display: { xs: 'flex', md: 'none' } },
  menuIcon: {
    color: colors.primary
  }
}; 
