import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  TextField, 
  InputAdornment,
  Container,
  Card,
  CardContent,
  CircularProgress,
  Pagination,
  Divider
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import AnimatedCard from '../components/AnimatedCard';
import { getNewsPosts } from '../utils/markdownLoader';

export default function NewsPage() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const postsPerPage = 6;

  useEffect(() => {
    async function fetchPosts() {
      try {
        const allPosts = await getNewsPosts();
        setPosts(allPosts);
        setFilteredPosts(allPosts);
      } catch (error) {
        console.error('Error loading news posts:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchPosts();
  }, []);

  useEffect(() => {
    // Filter posts based on search term
    const filtered = posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredPosts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, posts]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
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

  // Group posts by year
  const postsByYear = currentPosts.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {});

  // Sort years in descending order
  const sortedYears = Object.keys(postsByYear).sort((a, b) => b - a);

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
          News & Updates
        </Typography>
      </motion.div>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search news..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : filteredPosts.length > 0 ? (
        <>
          {sortedYears.map(year => (
            <Box key={year} sx={{ mb: 6 }}>
              <Typography 
                variant="h4" 
                component="h2" 
                gutterBottom
                sx={{ 
                  mb: 3,
                  position: 'relative',
                  display: 'inline-block',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    height: '2px',
                    bottom: '-4px',
                    left: 0,
                    backgroundColor: 'primary.main',
                    borderRadius: '2px'
                  }
                }}
              >
                {year}
              </Typography>
              
              <Grid container spacing={3}>
                {postsByYear[year].map((post, index) => (
                  <Grid item xs={12} sm={6} md={4} key={post.id}>
                    <AnimatedCard
                      title={post.title}
                      date={post.date}
                      excerpt={post.excerpt}
                      link={post.path}
                      delay={index}
                    />
                  </Grid>
                ))}
              </Grid>
              
              {year !== sortedYears[sortedYears.length - 1] && (
                <Divider sx={{ mt: 4 }} />
              )}
            </Box>
          ))}
          
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
              No news found
            </Typography>
            <Typography variant="body1">
              {searchTerm 
                ? "Try adjusting your search."
                : "Add markdown files to the src/content/news directory to see them here."}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}
