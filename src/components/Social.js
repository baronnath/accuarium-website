import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FaGlobe, FaTiktok, FaInstagram, FaFacebookF, FaMastodon, FaYoutube } from 'react-icons/fa';
import { colors } from '../theme';


// if you wanto to add twitter
// import TwitterIcon from '@material-ui/icons/Twitter';

const socialMedia = {
  homepage: "/",
  // twitter: "https://twitter.com/accuariums",
  tiktok: 'https://www.tiktok.com/@accuarium',
  instagram: "https://www.instagram.com/accuariums/",
  youtube: "https://www.youtube.com/channel/UC8IOy0uPms7PJOvGSCTXl3A",
  mastodon: "https://mastodon.cloud/@accuarium",
  // You can add like this
  facebook: "https://www.facebook.com/Accuarium-103815829076298",
  // github: "https://github.com/SatoruAkiyama/nextjs-and-material-ui-template-with-header-and-footer",
};



const Social = ({ color, align = 'center', style }) => {
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
    <Grid item container spacing={2} justifyContent={align} style={style}>
      <Grid
        item
        component={"a"}
        target="_blank"
        rel="noreferrer noopener"
        href={socialMedia.instagram}
      >
        <FaInstagram
          title="instagram"
          size={26}
          color={color ? color : "primary"}
        />
      </Grid>
      <Grid
        item
        component={"a"}
        target="_blank"
        rel="noreferrer noopener"
        href={socialMedia.tiktok}
      >
       <FaTiktok
          title="tiktok"
          size={23}
          color={color ? color : colors.primary}
        />
      </Grid>
      <Grid
        item
        component={"a"}
        target="_blank"
        rel="noreferrer noopener"
        href={socialMedia.youtube}
      >
        <FaYoutube
          title="youtube"
          size={26}
          color={color ? color : "primary"}
        />
      </Grid>
      <Grid
        item
        component={"a"}
        target="_blank"
        rel="noreferrer noopener"
        href={socialMedia.mastodon}
      >
        <FaMastodon
          title="mastodon"
          size={26}
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
        <FaFacebookF
          title="facebook"
          size={24}
          color={color ? color : "primary"}
        />
      </Grid>
      {/*<Grid
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
      </Grid>*/}
      {/*<Grid
        item
        component={"a"}
        // target="_blank"
        rel="noreferrer noopener"
        href={socialMedia.homepage}
      >
        <FaGlobe
          title="home"
          size={23}
          color={color ? color : "primary"}
        />
      </Grid>*/}
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

