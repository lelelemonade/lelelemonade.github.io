import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  IconButton, 
  Divider,
  useTheme,
  useMediaQuery,
  Theme
} from '@mui/material';
import { 
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import MarkdownRenderer from './MarkdownRenderer';
import { Post } from '../utils/markdownLoader';

interface TimelineNewsProps {
  posts: Post[];
}

interface TimelineItemProps {
  post: Post;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  formatDate: (date: string) => string;
  isMobile: boolean;
  totalPosts: number;
}

const TimelineNews: React.FC<TimelineNewsProps> = ({ posts }) => {
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const timelineRef = useRef<HTMLDivElement>(null);
  
  const handleToggleExpand = (id: string): void => {
    // If already expanded, collapse it
    if (expandedPost === id) {
      setExpandedPost(null);
    } else {
      // Otherwise expand the new one
      setExpandedPost(id);
    }
  };
  
  // Format date to be more readable
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Box 
      ref={timelineRef} 
      sx={{ 
        position: 'relative', 
        pb: 4,
        minHeight: '500px' // Ensure minimum height for timeline
      }}
    >
      {/* Curved timeline line using SVG */}
      <Box
        sx={{
          position: 'absolute',
          left: { xs: '20px', md: '50%' },
          transform: { xs: 'none', md: 'translateX(-50%)' },
          height: '100%',
          zIndex: 0,
          width: '100%',
          pointerEvents: 'none'
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%' 
          }}
        >
          <motion.path
            d={`M ${isMobile ? 20 : 50},0 
                Q ${isMobile ? 30 : 60},25 ${isMobile ? 20 : 45},50 
                Q ${isMobile ? 10 : 40},75 ${isMobile ? 20 : 55},100`}
            fill="transparent"
            stroke={theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}
            strokeWidth="4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </svg>
      </Box>
      
      {posts.map((post, index) => (
        <TimelineItem 
          key={post.id}
          post={post}
          index={index}
          isExpanded={expandedPost === post.id}
          onToggle={() => handleToggleExpand(post.id)}
          formatDate={formatDate}
          isMobile={isMobile}
          totalPosts={posts.length}
        />
      ))}
    </Box>
  );
};

const TimelineItem: React.FC<TimelineItemProps> = ({ 
  post, 
  index, 
  isExpanded, 
  onToggle, 
  formatDate, 
  isMobile}) => {
  const theme = useTheme<Theme>();
  const itemRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, amount: 0.2 });
  const isEven = index % 2 === 0;
  
  // Calculate the vertical position for the dot (centered with the card header)
  const dotOffsetY = 24; // Align with the title
  
  // Ensure the dot is always on the timeline
  const dotPosition = {
    left: isMobile ? '20px' : '50%',
    transform: isMobile ? 'translateX(0)' : 'translateX(-50%)',
    top: `${dotOffsetY}px`,
    zIndex: 5
  };

  // Keep track of the content height to prevent layout shifts
  const [, setContentHeight] = useState<number>(0);
  
  useEffect(() => {
    if (contentRef.current) {
      // Get the height of the content when expanded
      const updateHeight = (): void => {
        if (isExpanded && contentRef.current) {
          setContentHeight(contentRef.current.scrollHeight);
        }
      };
      
      updateHeight();
      
      // Add resize listener to update height if window size changes
      window.addEventListener('resize', updateHeight);
      return () => window.removeEventListener('resize', updateHeight);
    }
  }, [isExpanded]);

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ 
        width: '100%',
        display: 'flex',
        justifyContent: isMobile ? 'flex-start' : (isEven ? 'flex-start' : 'flex-end'),
        position: 'relative',
      }}
    >
      {/* Timeline dot - positioned absolutely relative to the timeline */}
      <Box
        component={motion.div}
        sx={{
          position: 'absolute',
          ...dotPosition,
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: 'primary.main',
          border: `4px solid ${theme.palette.background.paper}`,
        }}
        initial={{ scale: 0 }}
        animate={isInView ? { scale: [0, 1.2, 1] } : { scale: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      />
      
      {/* Content card - positioned relative to maintain layout */}
      <Box
        sx={{
          width: { xs: 'calc(100% - 40px)', md: '45%' },
          mb: 6,
          ml: { 
            xs: 5, 
            md: isEven ? '5%' : 'auto' 
          },
          mr: { 
            xs: 0, 
            md: !isEven ? '5%' : 'auto' 
          },
          position: 'relative',
        }}
      >
        <motion.div
          layout
          whileHover={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 2,
              borderLeft: `4px solid ${theme.palette.primary.main}`,
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              '&:hover': {
                boxShadow: 6,
              },
              position: 'relative',
              zIndex: 2,
            }}
            onClick={onToggle}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Typography variant="h5" component="h3" gutterBottom>
                {post.title}
              </Typography>
              <IconButton 
                size="small" 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  onToggle(); 
                }}
              >
                {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CalendarIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {formatDate(post.date)}
              </Typography>
            </Box>
            
            {!isExpanded && (
              <Typography variant="body2" color="text.secondary">
                {post.excerpt}
              </Typography>
            )}
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  ref={contentRef}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: 'hidden' }}
                >
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ mt: 2 }}>
                    <MarkdownRenderer content={post.content} />
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </Paper>
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default TimelineNews;
