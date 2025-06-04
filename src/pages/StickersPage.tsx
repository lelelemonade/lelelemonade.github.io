import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  TextField, 
  InputAdornment,
  Container,
  CircularProgress,
  Card,
  CardContent
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import StickerCard from '../components/StickerCard';
import { getStickers, Sticker } from '../utils/stickerLoader';

const StickersPage: React.FC = () => {
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [filteredStickers, setFilteredStickers] = useState<Sticker[]>([]);
  const [displayedStickers, setDisplayedStickers] = useState<Sticker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  
  const observer = useRef<IntersectionObserver | null>(null);
  const stickersPerPage = 12;
  
  // Load stickers on component mount
  useEffect(() => {
    async function fetchStickers(): Promise<void> {
      try {
        const allStickers = await getStickers();
        setStickers(allStickers);
        setFilteredStickers(allStickers);
        setDisplayedStickers(allStickers.slice(0, stickersPerPage));
        setHasMore(allStickers.length > stickersPerPage);
      } catch (error) {
        console.error('Error loading stickers:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchStickers();
  }, []);

  // Filter stickers based on search term
  useEffect(() => {
    const filtered = stickers.filter(sticker => 
      sticker.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredStickers(filtered);
    setDisplayedStickers(filtered.slice(0, stickersPerPage));
    setPage(1);
    setHasMore(filtered.length > stickersPerPage);
  }, [searchTerm, stickers]);

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  // Reference for the last sticker element (for infinite scroll)
  const lastStickerElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    
    if (observer.current) {
      observer.current.disconnect();
    }
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreStickers();
      }
    });
    
    if (node) {
      observer.current.observe(node);
    }
  }, [loading, hasMore]);

  // Load more stickers when scrolling
  const loadMoreStickers = (): void => {
    const nextPage = page + 1;
    const startIndex = (nextPage - 1) * stickersPerPage;
    const endIndex = nextPage * stickersPerPage;
    
    setDisplayedStickers(prevStickers => [
      ...prevStickers,
      ...filteredStickers.slice(startIndex, endIndex)
    ]);
    
    setPage(nextPage);
    setHasMore(endIndex < filteredStickers.length);
  };

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
          Stickers
        </Typography>
      </motion.div>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search stickers used by ZhongLi..."
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
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : filteredStickers.length > 0 ? (
        <Grid container spacing={3}>
          {displayedStickers.map((sticker, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              lg={3} 
              key={sticker.id}
              ref={index === displayedStickers.length - 1 ? lastStickerElementRef : undefined}
            >
              <StickerCard sticker={sticker} delay={index % stickersPerPage} />
            </Grid>
          ))}
          {hasMore && (
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                <CircularProgress size={30} />
              </Box>
            </Grid>
          )}
        </Grid>
      ) : (
        <Card sx={{ p: 3, textAlign: 'center' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              No stickers found
            </Typography>
            <Typography variant="body1">
              {searchTerm 
                ? "Try adjusting your search term."
                : "Add sticker files to the src/content/stickers directory to see them here."}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default StickersPage;
