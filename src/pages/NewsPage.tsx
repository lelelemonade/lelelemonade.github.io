import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  InputAdornment,
  Container,
  Card,
  CardContent,
  CircularProgress,
  Pagination
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import TimelineNews from '../components/TimelineNews';
import { getNewsPosts, Post } from '../utils/markdownLoader';

const NewsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  const postsPerPage = 10; // More posts per page for timeline view

  useEffect(() => {
    async function fetchPosts(): Promise<void> {
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number): void => {
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
          News
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
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <TimelineNews posts={currentPosts} />
            
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
          </motion.div>
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
};

export default NewsPage;
