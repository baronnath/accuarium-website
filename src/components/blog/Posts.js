import React, {useState, useEffect } from 'react';
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
import Pagination from './Pagination';
import Share from './Share';
import Alert from '../Alert';
import Spinner from '../app/Spinner';
import translator from '../../translator/translator';
import { Api } from '../../helpers/axios';
import { colors } from '../../theme';
import { sanitize } from '../../helpers/blog';
import config from '../../config/app';

const Posts = () => {

  const i18n = translator();
  const user = {
    locale: i18n.locale,
    accessToken: null
  }
  const api = new Api(user);

  const [isLoading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [share, setShare] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [alert, setAlert] = useState({
    message: null,
    type: null,
    open: false,
  });

  useEffect(() => {
    const params = { params: {
      language: i18n.locale,
      page: currentPage,
      per_page: config.pagination,
    } }
    api.getPosts(params)
      .then(res => { 
        if ( res.data.length ) {
          setPosts(res.data);
          setTotalPages(res.headers['x-wp-totalpages']);
        } else {
          handleError(i18n.t('blog.noPosts'));
        }
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        handleError(err);
      });
  },[currentPage]);

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
    <>
      { posts.length ? (
        <>
          <Grid container spacing={2} sx={{ marginTop:2 }}>
            { posts.map( post => (
              <Grid item xs={12} sm={6} style={{display: 'flex'}}>
                <Card  style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
                  <Link to={`/post/${post.slug}`} className="btn btn-secondary float-right">
                    <CardMedia
                      sx={{ height: 250}}
                      image={post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia']['0'].source_url}
                      title={post.title.rendered}
                    />
                  </Link>
                  <CardContent>
                    <Link to={`/post/${post.slug}`} className="btn btn-secondary float-right" style={{ textDecoration: 'none', color: "#fff" }}>
                      <Typography gutterBottom variant="h3" component="h2" dangerouslySetInnerHTML={{ __html: sanitize(post.title.rendered) }}>
                      </Typography>
                    </Link>
                    <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}>
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      aria-describedby={"share"}
                      variant="contained"
                      onClick={(e) => handleShare(e, post.slug)}
                    >
                      {i18n.t('blog.share')}
                    </Button>
                    <Share id={`share-${post.slug}`} isOpen={share} onClose={setShare} anchorEl={anchorEl} post={post}/>
                    <Button size="small">
                      <Link to={`/post/${post.slug}`} className="btn btn-secondary float-right" style={{ textDecoration: 'none', color: colors.primary }}>
                        {i18n.t('blog.readMore')}
                      </Link>
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ) ) }
          </Grid>
          { totalPages > config.pagination &&
            <Pagination
              currentPage={ currentPage }
              setCurrentPage={ setCurrentPage }
              totalPages={ totalPages }
            />
          }
        </>
      ) : '' }
      { isLoading &&
        <Spinner />
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

export default Posts;