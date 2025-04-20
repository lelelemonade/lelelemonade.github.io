import { Box, Typography, Container, IconButton, Paper, Tooltip, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { 
  Email as EmailIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Code as CodeIcon
} from '@mui/icons-material';
import { useTheme } from '../hooks/useTheme';

// Discord icon SVG component
function DiscordIcon() {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="32" 
      height="32" 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z" />
    </svg>
  );
}

export default function ContactSection() {
  const { mode } = useTheme();
  
  const socialLinks = [
    {
      name: 'Email',
      icon: <EmailIcon fontSize="large" />,
      url: 'mailto:germanysoftwareengineer@gmail.com',
      color: '#EA4335'
    },
    {
      name: 'GitHub',
      icon: <GitHubIcon fontSize="large" />,
      url: 'https://github.com/lelelemonade',
      color: '#171515'
    },
    {
      name: 'LinkedIn',
      icon: <LinkedInIcon fontSize="large" />,
      url: 'https://www.linkedin.com/in/shen-zhongli/',
      color: '#0A66C2'
    },
    {
      name: 'LeetCode',
      icon: <CodeIcon fontSize="large" />,
      url: 'https://leetcode.com/u/lelelemonade/',
      color: '#FFA116'
    },
    {
      name: 'Discord',
      icon: <DiscordIcon />,
      url: 'https://discordapp.com/users/cacacarrot1',
      color: '#5865F2'
    }
  ];

  return (
    <Box
      component="section"
      id="contact"
      sx={{
        py: 8,
        background: theme => mode === 'dark' 
          ? 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)'
          : 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
        borderRadius: 4,
        mb: 6,
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            component="h2"
            variant="h3"
            align="center"
            gutterBottom
            sx={{ mb: 4, fontWeight: 'bold' }}
          >
            Get In Touch
          </Typography>
          
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            paragraph
            sx={{ maxWidth: 700, mx: 'auto', mb: 6 }}
          >
            Feel free to reach out to me through any of these platforms. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </Typography>
        </motion.div>
        
        <Grid container spacing={3} justifyContent="center">
          {socialLinks.map((link, index) => (
            <Grid item key={link.name}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Paper
                  elevation={3}
                  component={motion.div}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0px 10px 25px rgba(0,0,0,0.2)'
                  }}
                  sx={{ 
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: 3,
                    width: 120,
                    height: 120,
                    justifyContent: 'center'
                  }}
                >
                  <Tooltip title={`Connect on ${link.name}`}>
                    <IconButton
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.name}
                      sx={{ 
                        color: mode === 'dark' ? link.color : link.color,
                        mb: 1,
                        '&:hover': {
                          backgroundColor: 'rgba(0,0,0,0.04)'
                        }
                      }}
                    >
                      {link.icon}
                    </IconButton>
                  </Tooltip>
                  <Typography variant="body2" fontWeight="medium">
                    {link.name}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
