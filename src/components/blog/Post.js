import React, {useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import {
  Container,
  Box,
  Grid,
  Button,
  Typography,
  CircularProgress
} from '@mui/material';
import Alert from '../Alert';
import Share from './Share';
import Spinner from '../app/Spinner';
import translator from '../../translator/translator';
import { Api } from '../../helpers/axios';
import { sanitize } from '../../helpers/blog';
import { colors } from '../../theme';

const Post = () => {

  const params = useParams();
  const i18n = translator();
  const user = {
    locale: i18n.locale,
    accessToken: null
  }
  const api = new Api(user);

  const [isLoading, setLoading] = useState(true);
  const [post, setPost] = useState([]);
  const [share, setShare] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [alert, setAlert] = useState({
    message: null,
    type: null,
    open: false,
  });

  useEffect(() => {
    api.getPosts({ params: { slug: params.slug } })
      .then(res => { 
        if ( res.data.length ) {
          setPost(res.data[0]);
          console.warn(res.data[0]);
        } else {
          handleError(i18n.t('blog.noPosts'));
        }
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        handleError(err);
      });
  },[]);

  const handleShare = (e) => {
    setAnchorEl(e.currentTarget);
    setShare(true);
  }

  function handleError(err) {
    setAlert(prevAlert => ({
      ...prevAlert,
      message: err.response.data ? err.response.data.message : i18n.t('networkError'),
      type: 'error',
      open: true,
    }));   
  }

  return (
      <>
        { isLoading ?
            <Container sx={{ marginTop:15 }}>
              <Spinner />
            </Container>
          :
            <>
              <section style={styles.root} id="section0">
                <img
                  src={post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia']['0'].source_url}
                  alt={post.title.rendered}
                  loading="lazy"
                  style={styles.video}
                />
                <div style={styles.overlay}>
                  <Box
                    height="100%"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    color="#fff"
                    sx={styles.textContainer}
                  >
                    <Typography variant="h2" component="h1" sx={styles.title} dangerouslySetInnerHTML={{ __html: sanitize(post.title.rendered) }}>
                    </Typography>
                    {/*<Typography variant="h6" component="h3" sx={styles.subtitle}>
                      {i18n.t('hero.subtitle')}
                    </Typography>*/}
                  </Box>
                </div>
              </section>
              <Container sx={{ marginTop:5 }} maxWidth="sm">
                <Box dangerouslySetInnerHTML={{ __html: sanitize(post.content.rendered) }}>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center"}}>
                  <Button
                    variant="outlined"
                    sx={{marginTop: 3}}
                    fullWidth={true}
                    size="small"
                    aria-describedby={"share"}
                    onClick={handleShare}
                  >
                    {i18n.t("blog.share")}
                  </Button>
                  <Share id="share" isOpen={share} onClose={setShare} anchorEl={anchorEl} post={post} position="center" />
                </Box>
              </Container>
            </>
        }
        <Alert
          message={alert.message}
          type={alert.type}
          isOpen={alert.open}
          onClose={() => setAlert(prevAlert => ({
            ...prevAlert,
            open: false,
          }))}
        />
      </>
  );
};

export default Post;

const styles = {
  video: {
    height: "50vh",
    width: "calc(100vw - (100vw - 100%))",
    objectFit: "cover"
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '50vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    textAlign: {xs: 'left', sm:'center'},
    width: '100%',
  },
  subtitle: {
    textAlign: {xs: 'left', sm:'center'},
    width: '100%',
    marginBottom: {md:20},
    paddingLeft: {md:'20%'},
    paddingRight: {md:'20%'},
  },
  textContainer: {
    textAlign: 'left',
    px: 5,
  },
  downloadButtonContainer: {
    width: {xs: '80%', sm:'30%', xl:'15%'},
    alignSelf: {xs:'start', sm:'center'}
  },
  downloadButton: {
    maxWidth: '100%',
    height: 'auto',
  },
  callToAction: {
    fontWeight: 'bold',
    color: colors.white,
  }
}