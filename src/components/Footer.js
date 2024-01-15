import { NavLink } from "react-router-dom";
import { Container, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Social from './Social';
import Legal from './Legal';
import translator from '../translator/translator';

const i18n = translator();

const routes = [
  { label: i18n.t('menu.home'), ref: "/" },
  { label: i18n.t('menu.blog'), ref: "/blog" },
  { label: i18n.t('menu.species'), ref: "/species" },
  { label: i18n.t('menu.about'), ref: "/about" },
  // { label: i18n.t('menu.press'), ref: "/press" },
  // { name: "path name", link: "link url" }, like this
];

const Footer = () => {
  const theme = useTheme();
  const path = routes;
  // const router = useRouter();

  const styles = {
    footer: {
      backgroundColor: theme.palette.primary.main,
      width: '100%',
      position: 'relative',
      overflow: "hidden",
      marginTop: "6em",
      padding: "2em 0 ",
    },
    link: {
      fontSize: "1.25em",
      color: "#fff",
      // "&:hover": {
      //   color: theme.palette.info.main,
      // },
    },
    copylight: {
      color: theme.palette.background.paper,
      fontSize: "1em",
      // "&:hover": {
      //   color: theme.palette.info.main,
      // },
    },
  };

  return (
    <footer style={styles.footer}>
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="center">
          {path.map(({ label, ref }) => (
            <Grid item key={label}>
              <NavLink to={ref}
                key={label}
                style={({ isActive }) => {
                  return {
                    fontWeight: isActive ? "bold" : '',
                    color: theme.palette.background.paper,
                    fontSize: "1.25em",
                    textDecoration: "none",
                  }
                }}
              >
                {label}
              </NavLink>
            </Grid>
          ))}
        </Grid>
        <Grid container direction="column" style={{ margin: "1.2em 0" }}>
          <Social color={theme.palette.background.paper}/>
        </Grid>
        <Grid
          item
          container
          component={"a"}
          // target="_blank"
          rel="noreferrer noopener"
          href="/"
          justifyContent="center" 
          style={{
            textDecoration: "none",
          }}
        >
          <Typography style={styles.copylight}>
            Accuarium app
          </Typography>
        </Grid>
        <Grid container direction="column" style={{ margin: "1.2em 0" }}>
          <Legal color={theme.palette.background.paper}/>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;