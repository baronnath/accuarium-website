import React, {useState, useEffect, useRef, useCallback } from 'react';
import { Link } from "react-router-dom";
import {
  Container,
  Box,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography
} from '@mui/material';
import Pagination from '../blog/Pagination';
import Share from '../blog/Share';
import Alert from '../Alert';
import Spinner from '../app/Spinner';
import translator from '../../translator/translator';
import { Api } from '../../helpers/axios';
import { colors } from '../../theme';
import { sanitize } from '../../helpers/blog';
import config from '../../config/app';

const SearchSpecies = () => {

  const i18n = translator();
  const locale = i18n.locale;
  const user = {
    locale: locale,
    accessToken: null
  }
  const loaderRef = useRef(null);
  const api = new Api(user);

  const [isLoading, setLoading] = useState(false);
  // const [totalPages, setTotalPages] = useState(1);
  const [species, setSpecies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [finalPage, setFinalPage] = useState(false);
  const [share, setShare] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [alert, setAlert] = useState({
    message: null,
    type: null,
    open: false,
  });

  const fetchSpecies = useCallback(async () => {
    if (isLoading) return;

    setLoading(true);
    api.speciesSearch(currentPage)
      .then(res => { 
        if ( res.data.species.length ) {
          setSpecies((prevSpecies) => [...prevSpecies,...res.data.species]);
          // setTotalPages(res.headers['x-wp-totalpages']);
        } else {
          setAlert(prevAlert => ({
            ...prevAlert,
            message: i18n.t('species.noSpecies'),
            type: 'info',
            open: true,
          }));   
          setFinalPage(true);
        }
        setLoading(false);
        setCurrentPage((prevPage) => prevPage + 1);
      })
      .catch(err => {
        setLoading(false);
        handleError(err);
      });

  }, [currentPage, isLoading]);

  // useEffect(() => {
  //   fetchSpecies();
  // },[])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          fetchSpecies();
          // setCurrentPage(parseInt(currentPage) + 1);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current && !finalPage) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  },[fetchSpecies]);

  function handleError(err) {
    setAlert(prevAlert => ({
      ...prevAlert,
      message: err.response.data ? err.response.data.message : i18n.t('networkError'),
      type: 'error',
      open: true,
    }));   
  }

  const handleShare = (e, slug) => {
    setAnchorEl(e.currentTarget);
    setShare(slug);
  }

  return (
    <Container sx={{ marginTop:15 }}>
      <Typography variant="h2" component="div">
        {i18n.t('blog.blog')}
      </Typography>
      { species.length ?
        <>
          <Grid container spacing={2} sx={{ marginTop:2}}>
            { species.map( sp => (
                sp.images &&
                  <Grid item xs={12} sm={6} style={{display: 'flex'}}>
                    <Card variant="outlined" style={styles.card}>
                      <Link to={`/species/${sp.scientificName.replace(' ', '-').toLowerCase()}`} className="btn btn-secondary">
                        <CardMedia
                          component="img"
                          sx={styles.cardMedia}
                          image={`${config.backend.imagesUrl}species/${sp.scientificName.replace(' ', '-').toLowerCase()}/${sp.images[0]}`}
                          title={sp.scientificName}
                        />
                      </Link>
                      <CardContent>
                        <Link to={`/species/${sp.scientificName.replace(' ', '-').toLowerCase()}`} className="btn btn-secondary float-right" style={styles.cardTitle}>
                          <Typography gutterBottom variant="h3" component="h2">
                            {sp.name[locale].charAt(0).toUpperCase() + sp.name[locale].slice(1)}
                          </Typography>
                        </Link>
                        <Typography variant="body2" color="text.secondary" sx={{fontStyle: 'italic'}}>
                          {sp.scientificName}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          aria-describedby={"share"}
                          variant="contained"
                          onClick={(e) => handleShare(e, sp.scientificName.replace(' ', '-').toLowerCase())}
                        >
                          {i18n.t('blog.share')}
                        </Button>
                        <Share id={`share-${sp.scientificName.replace(' ', '-').toLowerCase()}`} isOpen={share} onClose={setShare} anchorEl={anchorEl} element={sp} type="species"/>
                        <Button size="small">
                          <Link to={`/species/${sp.scientificName.replace(' ', '-').toLowerCase()}`} className="btn btn-secondary float-right" style={{ textDecoration: 'none', color: colors.primary }}>
                            {i18n.t('blog.readMore')}
                          </Link>
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
            ) ) }
          </Grid>
        </>
        :
        ''
      }
      <div ref={loaderRef}>
        { isLoading &&
          <Spinner />
        }
      </div>
      <Alert
        message={alert.message}
        type={alert.type}
        isOpen={alert.open}
        onClose={() => setAlert(prevAlert => ({
          ...prevAlert,
          open: false,
        }))}
      />
    </Container>
  );
};

export default SearchSpecies;

const styles = {
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: 20,
    width: '100%',
    backgroundColor: 'black',
  },
  cardMedia: {
    width: '80%',
    marginLeft: '10%',
    marginTop: 5,
    marginBottom: 5,
  },
  cardTitle: {
    textDecoration: 'none',
    color: "#fff"
  },
}