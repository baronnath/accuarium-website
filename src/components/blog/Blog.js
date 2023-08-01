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
import Posts from './Posts';
import translator from '../../translator/translator';
import { Api } from '../../helpers/axios';
import { colors } from '../../theme';

const Blog = () => {

  const params = useParams();

  const i18n = translator();
  const user = {
    locale: i18n.locale,
    accessToken: null
  }
  const api = new Api(user);

  const [isLoading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [alert, setAlert] = useState({
    message: null,
    type: null,
    open: false,
  });

  useEffect(() => {
    const users = api.getPosts()
      .then(res => { 
        if ( res.data.length ) {
          setPosts(res.data);
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

  function handleError(err) {
    setAlert(prevAlert => ({
      ...prevAlert,
      message: err.response.data ? err.response.data.message : i18n.t('networkError'),
      type: 'error',
      open: true,
    }));   
  }

  return (
    <Container sx={{ marginTop:15 }}>
      <Typography variant="h2" component="div">
        {i18n.t('blog.blog')}
      </Typography>
      <Posts />
    </Container>
  );
};

export default Blog;