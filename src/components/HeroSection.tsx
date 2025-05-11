import React from 'react';
import { Box, Typography, Container, Button, Avatar, Theme } from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import avatarImage from '../assets/images/me.jpg';
import AudioPlayer from './AudioPlayer';

const HeroSection: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 8, md: 12 },
        mb: 6,
        borderRadius: 4,
        background: (theme: Theme) => `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 4,
          }}
        >
          <Box sx={{ maxWidth: { xs: '100%', md: '60%' } }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                <Typography
                  component="h1"
                  variant="h2"
                  color="white"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ mr: 1 }}
                >
                  Hello, I'm ZhongLi Shen(沈仲黎)
                </Typography>
                <AudioPlayer 
                  audioFile="/assets/audio/myname.wav" 
                  tooltipText="Hear how to pronounce my name"
                />
              </Box>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography
                variant="h5"
                color="white"
                paragraph
                sx={{ mb: 4, opacity: 0.9 }}
              >
                Welcome to my personal website where I share my journey, thoughts, and experiences.
              </Typography>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  component={Link}
                  to="/blog"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    backgroundColor: 'white',
                    color: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    },
                  }}
                >
                  Read My Blog
                </Button>
                <Button
                  component={Link}
                  to="/news"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Latest News
                </Button>
              </Box>
            </motion.div>
          </Box>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            <Avatar
              src={avatarImage}
              alt="ZhongLi Shen"
              sx={{
                width: { xs: 200, md: 280 },
                height: { xs: 200, md: 280 },
                border: '4px solid white',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              }}
            />
          </motion.div>
        </Box>
      </Container>
      
      {/* Decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -50,
          left: -50,
          width: 200,
          height: 200,
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          zIndex: 0,
        }}
      />
    </Box>
  );
};

export default HeroSection;
