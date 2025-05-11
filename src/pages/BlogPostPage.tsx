import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Container, 
  Breadcrumbs, 
  Chip,
  Avatar,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Button
} from '@mui/material';
import { 
  NavigateNext as NavigateNextIcon,
  CalendarToday as CalendarIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { getBlogPosts, Post } from '../utils/markdownLoader';
import avatarImage from '../assets/images/me.jpg';

interface BlogPostWithTags extends Post {
  tags?: string[];
}

interface RouteParams {
  id: string;
}

const BlogPostPage: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const [post, setPost] = useState<BlogPostWithTags | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostWithTags[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost(): Promise<void> {
      try {
        setLoading(true);
        const allPosts = await getBlogPosts() as BlogPostWithTags[];
        const currentPost = allPosts.find(post => post.id === id);
        
        if (!currentPost) {
          setError('Blog post not found');
          return;
        }
        
        setPost(currentPost);
        
        // Find related posts (posts with similar tags)
        if (currentPost.tags && currentPost.tags.length > 0) {
          const related = allPosts
            .filter(p => p.id !== id && p.tags && p.tags.some(tag => currentPost.tags!.includes(tag)))
            .slice(0, 3);
          setRelatedPosts(related);
        }
      } catch (error) {
        console.error('Error loading blog post:', error);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    }
    
    if (id) {
      fetchPost();
    }
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
          {error || 'Blog post not found'}
        </Typography>
        <Button 
          component={Link} 
          to="/blog" 
          startIcon={<ArrowBackIcon />}
          variant="contained"
        >
          Back to Blog
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
          <Link to="/blog" style={{ textDecoration: 'none', color: 'inherit' }}>
            Blog
          </Link>
          <Typography color="text.primary">{post.title}</Typography>
        </Breadcrumbs>

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
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar 
            src={avatarImage} 
            alt="Author" 
            sx={{ width: 48, height: 48, mr: 2 }}
          />
          <Box>
            <Typography variant="subtitle1" fontWeight="medium">
              ZhongLi Shen
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
              <CalendarIcon fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body2">
                {post.date}
              </Typography>
            </Box>
          </Box>
        </Box>
        
        {post.tags && post.tags.length > 0 && (
          <Box sx={{ mb: 4 }}>
            {post.tags.map(tag => (
              <Chip 
                key={tag} 
                label={tag} 
                size="small" 
                sx={{ mr: 1, mb: 1 }} 
              />
            ))}
          </Box>
        )}
        
        <Box sx={{ mb: 6 }}>
          <MarkdownRenderer content={post.content} />
        </Box>
        
        {relatedPosts.length > 0 && (
          <Box sx={{ mt: 8 }}>
            <Divider sx={{ mb: 4 }} />
            <Typography variant="h4" gutterBottom>
              Related Posts
            </Typography>
            <Grid container spacing={3}>
              {relatedPosts.map((relatedPost) => (
                <Grid item xs={12} md={4} key={relatedPost.id}>
                  <Card 
                    component={Link} 
                    to={relatedPost.path} 
                    sx={{ 
                      height: '100%', 
                      textDecoration: 'none', 
                      color: 'text.primary',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)'
                      }
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {relatedPost.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {relatedPost.excerpt}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
        
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Button 
            component={Link} 
            to="/blog" 
            startIcon={<ArrowBackIcon />}
            variant="contained"
          >
            Back to Blog
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
};

export default BlogPostPage;
