import { NavLink } from "react-router-dom";
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import translator from '../translator/translator';

// if you wanto to add twitter
// import TwitterIcon from '@material-ui/icons/Twitter';

const Legal = () => {
  const theme = useTheme();
  const i18n = translator();

  const routes = [
    {
      label: 'privacyPolicy',
      path: '/privacy-policy',
    },
    {
      label: 'cookiesPolicy',
      path: '/cookies-policy',
    },
    {
      label: 'legalNotice',
      path: '/legal-notice',
    },
    {
      label: 'terms',
      path: '/terms-and-conditions',
    }
  ];

  return (
    <Grid item container spacing={2} justifyContent="center">
      {
        routes.map(({ label, path }) => (
          <Grid item key={label}>
            <NavLink to={path}
              key={label}
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : '',
                  color: theme.palette.background.paper,
                  fontSize: "0.7em",
                  textDecoration: "none",
                }
              }}
            >
              {i18n.t(`legal.${label}`)}
            </NavLink>
          </Grid>
        ))
      }
    </Grid>
  );
};

export default Legal;

