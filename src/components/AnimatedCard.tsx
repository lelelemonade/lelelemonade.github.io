import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { CalendarToday as CalendarIcon } from '@mui/icons-material';

interface AnimatedCardProps {
  title: string;
  date: string;
  excerpt: string;
  image?: string;
  link: string;
  tags?: string[];
  delay?: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ 
  title, 
  date, 
  excerpt, 
  image, 
  link, 
  tags = [],
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ scale: 1.03 }}
    >
      <Card 
        component={Link} 
        to={link} 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          textDecoration: 'none',
          color: 'text.primary',
          overflow: 'hidden',
        }}
      >
        {image && (
          <CardMedia
            component="img"
            height="200"
            image={image}
            alt={title}
            sx={{
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />
        )}
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Typography 
            variant="h5" 
            component="h2" 
            gutterBottom
            sx={{
              fontWeight: 600,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {title}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'text.secondary' }}>
            <CalendarIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body2">
              {date}
            </Typography>
          </Box>
          
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{
              mb: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {excerpt}
          </Typography>
          
          {tags.length > 0 && (
            <Box sx={{ mt: 'auto', pt: 2 }}>
              {tags.map((tag, index) => (
                <Chip 
                  key={index} 
                  label={tag} 
                  size="small" 
                  sx={{ mr: 0.5, mb: 0.5 }} 
                />
              ))}
            </Box>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AnimatedCard;
