import React from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Sticker } from '../utils/stickerLoader';
import { S3Sticker } from '../utils/s3Service';

interface StickerCardProps {
  sticker: Sticker | S3Sticker;
  delay?: number;
}

const StickerCard: React.FC<StickerCardProps> = ({ sticker, delay = 0 }) => {
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
            image={'url' in sticker ? sticker.url : sticker.url}
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
              align={"center"}
            >
              {sticker.name}
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default StickerCard;
