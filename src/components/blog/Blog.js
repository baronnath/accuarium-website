import {
  Container,
  Typography,
} from '@mui/material';
import Posts from './Posts';
import translator from '../../translator/translator';

const Blog = () => {

  const i18n = translator();


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