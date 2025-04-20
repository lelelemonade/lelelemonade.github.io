import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  TextField, 
  InputAdornment,
  Container,
  Chip,
  Card,
  CardContent,
  CircularProgress,
  Pagination
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import AnimatedCard from '../components/AnimatedCard';
import { getBlogPosts } from '../utils/markdownLoader';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  
  const postsPerPage = 6;

  useEffect(() => {
    async function fetchPosts() {
      try {
        const allPosts = await getBlogPosts();
        setPosts(allPosts);
        setFilteredPosts(allPosts);
        
        // Extract unique tags from all posts
        const allTags = allPosts.reduce((acc, post) => {
          const postTags = post.tags || [];
          return [...acc, ...postTags];
        }, []);
        
        setTags([...new Set(allTags)]);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchPosts();
  }, []);

  useEffect(() => {
    // Filter posts based on search term and selected tags
    const filtered = posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           post.content.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 || 
                         (post.tags && selectedTags.every(tag => post.tags.includes(tag)));
      
      return matchesSearch && matchesTags;
    });
    
    setFilteredPosts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedTags, posts]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTagClick = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <Container maxWidth="lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom
          sx={{ 
            mb: 4,
            position: 'relative',
            display: 'inline-block',
            '&:after': {
              content: '""',
              position: 'absolute',
              width: '60%',
              height: '4px',
              bottom: '-8px',
              left: 0,
              backgroundColor: 'primary.main',
              borderRadius: '2px'
            }
          }}
        >
          Blog
        </Typography>
      </motion.div>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search blog posts..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />
        
        {tags.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {tags.map(tag => (
              <Chip
                key={tag}
                label={tag}
                clickable
                color={selectedTags.includes(tag) ? "primary" : "default"}
                onClick={() => handleTagClick(tag)}
              />
            ))}
          </Box>
        )}
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : filteredPosts.length > 0 ? (
        <>
          <Grid container spacing={3}>
            {currentPosts.map((post, index) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <AnimatedCard
                  title={post.title}
                  date={post.date}
                  excerpt={post.excerpt}
                  link={post.path}
                  tags={post.tags}
                  delay={index}
                />
              </Grid>
            ))}
          </Grid>
          
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
              <Pagination 
                count={totalPages} 
                page={currentPage} 
                onChange={handlePageChange} 
                color="primary" 
                size="large"
              />
            </Box>
          )}
        </>
      ) : (
        <Card sx={{ p: 3, textAlign: 'center' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              No blog posts found
            </Typography>
            <Typography variant="body1">
              {searchTerm || selectedTags.length > 0 
                ? "Try adjusting your search or filters."
                : "Add markdown files to the src/content/blogs directory to see them here."}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}
