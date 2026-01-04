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
  CardContent,
  Fab,
  Alert,
  Snackbar
} from '@mui/material';
import { Search as SearchIcon, CloudUpload } from '@mui/icons-material';
import { motion } from 'framer-motion';
import StickerCard from '../components/StickerCard';
import UploadDialog from '../components/UploadDialog';
import { listS3Stickers, uploadStickerToS3, S3Sticker } from '../utils/s3Service';

const StickersPage: React.FC = () => {
  const [stickers, setStickers] = useState<S3Sticker[]>([]);
  const [filteredStickers, setFilteredStickers] = useState<S3Sticker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [nextToken, setNextToken] = useState<string | undefined>();
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [uploadDialogOpen, setUploadDialogOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ message: string; severity: 'success' | 'error' } | null>(null);
  
  const observer = useRef<IntersectionObserver | null>(null);
  
  // Load initial stickers
  useEffect(() => {
    loadStickers();
  }, []);

  // Filter stickers based on search term
  useEffect(() => {
    const filtered = stickers.filter(sticker => 
      sticker.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStickers(filtered);
  }, [searchTerm, stickers]);

  const loadStickers = async (token?: string) => {
    try {
      const isInitialLoad = !token;
      if (isInitialLoad) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const result = await listS3Stickers(token);
      
      if (isInitialLoad) {
        setStickers(result.stickers);
      } else {
        setStickers(prev => [...prev, ...result.stickers]);
      }
      
      setNextToken(result.nextToken);
      setHasMore(!!result.nextToken);
    } catch (error) {
      console.error('Error loading stickers:', error);
      setNotification({ 
        message: 'Failed to load stickers. Please try again.', 
        severity: 'error' 
      });
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  const handleUpload = async (files: File[]): Promise<void> => {
    try {
      const uploadPromises = files.map(file => uploadStickerToS3(file));
      const uploadedStickers = await Promise.all(uploadPromises);
      
      setStickers(prev => [...uploadedStickers, ...prev]);
      setNotification({ 
        message: `Successfully uploaded ${files.length} sticker${files.length > 1 ? 's' : ''}!`, 
        severity: 'success' 
      });
    } catch (error) {
      console.error('Upload error:', error);
      throw new Error('Failed to upload stickers. Please try again.');
    }
  };

  // Reference for the last sticker element (for infinite scroll)
  const lastStickerElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading || loadingMore) return;
    
    if (observer.current) {
      observer.current.disconnect();
    }
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && nextToken) {
        loadStickers(nextToken);
      }
    });
    
    if (node) {
      observer.current.observe(node);
    }
  }, [loading, loadingMore, hasMore, nextToken]);

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
          placeholder="Search stickers..."
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
          {filteredStickers.map((sticker, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              lg={3} 
              key={sticker.id}
              ref={index === filteredStickers.length - 1 ? lastStickerElementRef : undefined}
            >
              <StickerCard sticker={sticker} delay={index % 12} />
            </Grid>
          ))}
          {loadingMore && (
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
                : "Upload some stickers to get started!"}
            </Typography>
          </CardContent>
        </Card>
      )}

      <Fab
        color="primary"
        aria-label="upload"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
        }}
        onClick={() => setUploadDialogOpen(true)}
      >
        <CloudUpload />
      </Fab>

      <UploadDialog
        open={uploadDialogOpen}
        onClose={() => setUploadDialogOpen(false)}
        onUpload={handleUpload}
      />

      <Snackbar
        open={!!notification}
        autoHideDuration={6000}
        onClose={() => setNotification(null)}
      >
        {notification && (
          <Alert 
            onClose={() => setNotification(null)} 
            severity={notification.severity}
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        )}
      </Snackbar>
    </Container>
  );
};

export default StickersPage;
