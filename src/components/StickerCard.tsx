import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box, 
  IconButton, 
  Snackbar,
  Alert
} from '@mui/material';
import { 
  ContentCopy as CopyIcon, 
  Download as DownloadIcon 
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Sticker } from '../utils/stickerLoader';

interface StickerCardProps {
  sticker: Sticker;
  delay?: number;
}

const StickerCard: React.FC<StickerCardProps> = ({ sticker, delay = 0 }) => {
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  const handleCopy = async (): Promise<void> => {
    try {
      // For images, we need to fetch them and create a blob
      const response = await fetch(sticker.url);
      const blob = await response.blob();
      
      // Use the clipboard API to copy the image
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
      
      setSnackbarMessage('Sticker copied to clipboard!');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Failed to copy sticker:', error);
      setSnackbarMessage('Failed to copy sticker. Your browser may not support this feature.');
      setSnackbarOpen(true);
    }
  };

  const handleDownload = (): void => {
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = sticker.url;
    link.download = `${sticker.name}.${sticker.format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setSnackbarMessage('Sticker downloaded!');
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (): void => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay * 0.1 }}
        whileHover={{ scale: 1.03 }}
      >
        <Card 
          sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <CardMedia
            component="img"
            image={sticker.url}
            alt={sticker.name}
            sx={{
              objectFit: 'contain',
              padding: 2,
              backgroundColor: (theme) => 
                theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
              height: 200,
              transition: 'transform 0.5s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />
          <CardContent sx={{ flexGrow: 1, p: 2 }}>
            <Typography 
              variant="h6" 
              component="h2" 
              gutterBottom
              sx={{
                fontWeight: 600,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {sticker.name}
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <IconButton 
                color="primary" 
                onClick={handleCopy}
                aria-label="Copy sticker to clipboard"
              >
                <CopyIcon />
              </IconButton>
              <IconButton 
                color="secondary" 
                onClick={handleDownload}
                aria-label="Download sticker"
              >
                <DownloadIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
      
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default StickerCard;
