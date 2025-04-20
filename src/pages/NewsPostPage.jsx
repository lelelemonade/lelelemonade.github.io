import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Container, 
  Breadcrumbs, 
  Chip,
  CircularProgress,
  Button,
  Paper
} from '@mui/material';
import { 
  NavigateNext as NavigateNextIcon,
  CalendarToday as CalendarIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { getNewsPosts } from '../utils/markdownLoader';

export default function NewsPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);
        const allPosts = await getNewsPosts();
        const currentPost = allPosts.find(post => post.id === id);
        
        if (!currentPost) {
          setError('News post not found');
          return;
        }
        
        setPost(currentPost);
      } catch (error) {
        console.error('Error loading news post:', error);
        setError('Failed to load news post');
      } finally {
        setLoading(false);
      }
    }
    
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !post) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" color="error" gutterBottom>
          {error || 'News post not found'}
        </Typography>
        <Button 
          component={Link} 
          to="/news" 
          startIcon={<ArrowBackIcon />}
          variant="contained"
        >
          Back to News
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />} 
          aria-label="breadcrumb"
          sx={{ mb: 3 }}
        >
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Home
          </Link>
          <Link to="/news" style={{ textDecoration: 'none', color: 'inherit' }}>
            News
          </Link>
          <Typography color="text.primary">{post.title}</Typography>
        </Breadcrumbs>

        <Paper 
          elevation={2} 
          sx={{ 
            p: { xs: 3, md: 5 }, 
            mb: 4, 
            borderRadius: 2,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '5px',
              background: theme => `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
            }} 
          />
          
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{ 
              mb: 3,
              fontWeight: 700
            }}
          >
            {post.title}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, color: 'text.secondary' }}>
            <CalendarIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body1">
              {post.date}
            </Typography>
          </Box>
          
          <Box sx={{ mb: 4 }}>
            <MarkdownRenderer content={post.content} />
          </Box>
        </Paper>
        
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Button 
            component={Link} 
            to="/news" 
            startIcon={<ArrowBackIcon />}
            variant="contained"
          >
            Back to News
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
}
