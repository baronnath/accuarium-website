import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Icon from '@mdi/react';
import { mdiInstagram, mdiFacebook, mdiGithub, mdiHome, mdiTwitter} from '@mdi/js'

// if you wanto to add twitter
// import TwitterIcon from '@material-ui/icons/Twitter';

const socialMedia = {
  homepage: "/",
  twitter: "https://twitter.com/accuariums",
  instagram: "https://www.instagram.com/accuariums/",
  // You can add like this
  facebook: "https://www.facebook.com/Accuarium-103815829076298",
  // github: "https://github.com/SatoruAkiyama/nextjs-and-material-ui-template-with-header-and-footer",
};



const Social = ({ color }) => {
  const theme = useTheme();
 

  const styles = {
    snsIcon: {
      width: "30px",
      height: "30px",
  
      // [theme.breakpoints.down("xs")]: {
      //   width: "25px",
      //   height: "25px",
      // },
      // "&:hover": {
      //   color: theme.palette.info.main,
      // },
    },
  };

  return (
    <Grid item container spacing={2} justifyContent="center">
      <Grid
        item
        component={"a"}
        // target="_blank"
        rel="noreferrer noopener"
        href={socialMedia.homepage}
      >
        <Icon
          path={mdiHome}
          title="home"
          size={1}
          color={color ? color : "primary"}
        />
      </Grid>
      <Grid
        item
        component={"a"}
        target="_blank"
        rel="noreferrer noopener"
        href={socialMedia.twitter}
      >
       <Icon
          path={mdiTwitter}
          title="instagram"
          size={1}
          color={color ? color : "primary"}
        />
      </Grid>
      <Grid
        item
        component={"a"}
        target="_blank"
        rel="noreferrer noopener"
        href={socialMedia.instagram}
      >
        <Icon
          path={mdiInstagram}
          title="instagram"
          size={1}
          color={color ? color : "primary"}
        />
      </Grid>
      <Grid
        item
        component={"a"}
        target="_blank"
        rel="noreferrer noopener"
        href={socialMedia.facebook}
      >
        <Icon
          path={mdiFacebook}
          title="facebook"
          size={1}
          color={color ? color : "primary"}
        />
      </Grid>
      {/* <Grid
        item
        component={"a"}
        target="_blank"
        rel="noreferrer noopener"
        href={github}
      >
        <Icon
          style={styles.snsIcon}
          path={mdiGithub}
          title="github"
          size={1}
          color={color ? color : "primary"}
        />
      </Grid> */}
      {/* add social media*/}
    </Grid>
  );
};

export default Social;

