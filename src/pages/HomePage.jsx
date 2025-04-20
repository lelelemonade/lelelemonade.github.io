import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Divider,
  Container,
  Button
} from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import AnimatedCard from '../components/AnimatedCard';
import { getBlogPosts, getNewsPosts } from '../utils/markdownLoader';

export default function HomePage() {
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      try {
        const blogs = await getBlogPosts();
        const news = await getNewsPosts();
        
        setLatestBlogs(blogs.slice(0, 3));
        setLatestNews(news.slice(0, 3));
      } catch (error) {
        console.error('Error loading content:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchContent();
  }, []);

  const skills = [
    { name: 'Web Development', level: 90 },
    { name: 'UI/UX Design', level: 85 },
    { name: 'Mobile Development', level: 75 },
    { name: 'Data Science', level: 70 },
  ];

  return (
    <Box>
      <HeroSection />
      
      <Container maxWidth="lg">
        {/* About Me Section */}
        <Box sx={{ mb: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography 
              variant="h3" 
              component="h2" 
              gutterBottom
              sx={{ 
                position: 'relative',
                display: 'inline-block',
                mb: 4,
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
              About Me
            </Typography>
          </motion.div>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Typography variant="body1" paragraph>
                  Hello! I'm ZhongLi Shen, a passionate developer and tech enthusiast. I love building things for the web and sharing my knowledge with others.
                </Typography>
                <Typography variant="body1" paragraph>
                  With several years of experience in software development, I've worked on a variety of projects ranging from web applications to mobile apps and data analysis tools.
                </Typography>
                <Typography variant="body1" paragraph>
                  When I'm not coding, you can find me exploring new technologies, writing blog posts, or enjoying outdoor activities.
                </Typography>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Typography variant="h6" gutterBottom>My Skills</Typography>
                {skills.map((skill, index) => (
                  <Box key={skill.name} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">{skill.name}</Typography>
                      <Typography variant="body2">{skill.level}%</Typography>
                    </Box>
                    <Box
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: 'background.paper',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.4 + index * 0.1 }}
                        style={{
                          height: '100%',
                          borderRadius: 4,
                          background: 'linear-gradient(90deg, #3a7bd5, #00d2ff)',
                          position: 'absolute',
                          left: 0,
                          top: 0,
                        }}
                      />
                    </Box>
                  </Box>
                ))}
              </motion.div>
            </Grid>
          </Grid>
        </Box>
        
        <Divider sx={{ my: 6 }} />
        
        {/* Latest Blog Posts */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography 
              variant="h3" 
              component="h2"
              sx={{ 
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
              Latest Blog Posts
            </Typography>
            <Button 
              component={Link} 
              to="/blog" 
              variant="outlined"
            >
              View All
            </Button>
          </Box>
          
          {loading ? (
            <Typography>Loading latest blog posts...</Typography>
          ) : latestBlogs.length > 0 ? (
            <Grid container spacing={3}>
              {latestBlogs.map((post, index) => (
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
          ) : (
            <Card sx={{ p: 3, textAlign: 'center' }}>
              <CardContent>
                <Typography variant="body1">
                  No blog posts found. Add markdown files to the src/content/blogs directory to see them here.
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>
        
        <Divider sx={{ my: 6 }} />
        
        {/* Latest News */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography 
              variant="h3" 
              component="h2"
              sx={{ 
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
              Latest News
            </Typography>
            <Button 
              component={Link} 
              to="/news" 
              variant="outlined"
            >
              View All
            </Button>
          </Box>
          
          {loading ? (
            <Typography>Loading latest news...</Typography>
          ) : latestNews.length > 0 ? (
            <Grid container spacing={3}>
              {latestNews.map((post, index) => (
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
          ) : (
            <Card sx={{ p: 3, textAlign: 'center' }}>
              <CardContent>
                <Typography variant="body1">
                  No news found. Add markdown files to the src/content/news directory to see them here.
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>
        
        {/* Contact Section */}
        <Box 
          sx={{ 
            mb: 8, 
            p: 4, 
            borderRadius: 4,
            background: theme => `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.action.hover} 100%)`,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography 
              variant="h3" 
              component="h2" 
              gutterBottom
              sx={{ 
                position: 'relative',
                display: 'inline-block',
                mb: 4,
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
              Get In Touch
            </Typography>
          </motion.div>
          
          <Typography variant="body1" paragraph>
            I'm always open to new opportunities and collaborations. Feel free to reach out to me through any of the channels below.
          </Typography>
          
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Email</Typography>
                  <Typography variant="body2">your.email@example.com</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>GitHub</Typography>
                  <Typography variant="body2">github.com/lelelemonade</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>LinkedIn</Typography>
                  <Typography variant="body2">linkedin.com/in/zhonglishen</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Twitter</Typography>
                  <Typography variant="body2">twitter.com/zhonglishen</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
