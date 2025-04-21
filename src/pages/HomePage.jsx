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
import ContactSection from '../components/ContactSection';
import AnimatedCard from '../components/AnimatedCard';
import SkillChip from '../components/SkillChip';
import { getBlogPosts, getNewsPosts } from '../utils/markdownLoader';
import { 
  Code as CodeIcon, 
  Storage as StorageIcon,
  Engineering as EngineeringIcon,
  Layers as LayersIcon,
  SmartToy as SmartToyIcon,
  Bolt as BoltIcon
} from '@mui/icons-material';

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
    'Java', 'Golang', 'Kotlin', 'Spring Boot', 'AWS', 'PostgreSQL', 
    'MySQL', 'Cassandra', 'Redis', 'Kubernetes', 'Docker', 'Kafka', 
    'RabbitMQ', 'Restful', 'gRPC', 'GraphQL', 'Prometheus', 'Grafana', 
    'Kibana', 'ShardingSphere', 'Junit', 'Github Action', 'JavaScript', 
    'React', 'Python', 'Rust', 'Linux', 'Agile'
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
            <Grid item xs={12} md={7}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Box sx={{ pl: 2, borderLeft: '3px solid', borderColor: 'primary.main' }}>
                  <Typography variant="body1" paragraph sx={{ display: 'flex', alignItems: 'center' }}>
                    <CodeIcon sx={{ mr: 1, color: 'primary.main' }} /> 
                    Super experienced backend software engineer.
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ display: 'flex', alignItems: 'center' }}>
                    <StorageIcon sx={{ mr: 1, color: 'primary.main' }} /> 
                    Manage large scale distributed systems and high performance application.
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ display: 'flex', alignItems: 'center' }}>
                    <EngineeringIcon sx={{ mr: 1, color: 'primary.main' }} /> 
                    Know how to make things done, and know under the hood.
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ display: 'flex', alignItems: 'center' }}>
                    <LayersIcon sx={{ mr: 1, color: 'primary.main' }} /> 
                    Believe in the future of Web3.
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ display: 'flex', alignItems: 'center' }}>
                    <SmartToyIcon sx={{ mr: 1, color: 'primary.main' }} /> 
                    Interested in using AI product, but not figure out how AI works.
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ display: 'flex', alignItems: 'center' }}>
                    <BoltIcon sx={{ mr: 1, color: 'primary.main' }} /> 
                    I do things first, without thinking consequences.
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={5}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Box 
                  component="img"
                  src="/assets/images/coding.svg"
                  alt="Software Development Illustration"
                  sx={{ 
                    width: '100%', 
                    maxWidth: 400,
                    height: 'auto',
                    display: { xs: 'none', md: 'block' },
                    mx: 'auto'
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
          
          {/* Skills Section */}
          <Box sx={{ mt: 6 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>My Skills</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.03 }}
                >
                  <SkillChip skill={skill} />
                </motion.div>
              ))}
            </Box>
          </Box>
        </Box>
        
        <Divider sx={{ my: 6 }} />
        
        {/* Latest Blogs */}
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
              Latest Blogs
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
            <Typography>Loading latest blogs...</Typography>
          ) : latestBlogs.length > 0 ? (
            <Grid container spacing={3}>
              {latestBlogs.map((post, index) => (
                <Grid item size={{xs:12, sm:6}} md={4} key={post.id}>
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
        <ContactSection />
        
      </Container>
    </Box>
  );
}
