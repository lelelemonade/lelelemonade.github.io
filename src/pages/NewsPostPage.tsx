import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Breadcrumbs,
  Link,
  Button,
  CircularProgress,
  Chip
} from '@mui/material';
import { 
  NavigateNext as NavigateNextIcon,
  ArrowBack as ArrowBackIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { getNewsPosts, Post } from '../utils/markdownLoader';

interface RouteParams {
  id: string;
}

const NewsPostPage: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost(): Promise<void> {
      try {
        const allPosts = await getNewsPosts();
        const foundPost = allPosts.find(p => p.id === id);
        
        if (foundPost) {
          setPost(foundPost);
        } else {
          setError('News post not found');
        }
      } catch (err) {
        console.error('Error loading news post:', err);
        setError('Failed to load news post');
      } finally {
        setLoading(false);
      }
    }
    
    if (id) {
      fetchPost();
    }
  }, [id]);

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !post) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h4" color="error" gutterBottom>
          {error || 'News post not found'}
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/news')}
        >
          Back to News
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mb: 4 }}>
          <Breadcrumbs 
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link 
              underline="hover" 
              color="inherit" 
              onClick={() => navigate('/')}
              sx={{ cursor: 'pointer' }}
            >
              Home
            </Link>
            <Link 
              underline="hover" 
              color="inherit" 
              onClick={() => navigate('/news')}
              sx={{ cursor: 'pointer' }}
            >
              News
            </Link>
            <Typography color="text.primary">{post.title}</Typography>
          </Breadcrumbs>
        </Box>

        <Paper 
          elevation={3} 
          sx={{ 
            p: { xs: 3, md: 5 }, 
            borderRadius: 2,
            mb: 4
          }}
        >
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{ 
              mb: 3,
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                width: '60px',
                height: '4px',
                bottom: '-8px',
                left: 0,
                backgroundColor: 'primary.main',
                borderRadius: '2px'
              }
            }}
          >
            {post.title}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Chip 
              icon={<CalendarIcon />} 
              label={formatDate(post.date)} 
              variant="outlined" 
              size="small"
            />
          </Box>
          
          <Box sx={{ mt: 4 }}>
            <MarkdownRenderer content={post.content} />
          </Box>
        </Paper>
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 6 }}>
          <Button 
            variant="contained" 
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/news')}
          >
            Back to News
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
};

export default NewsPostPage;
