import { Link } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { Home as HomeIcon } from '@mui/icons-material';

export default function NotFoundPage() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          py: 8,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '6rem', md: '10rem' },
              fontWeight: 700,
              background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            404
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ mb: 3, fontWeight: 600 }}
          >
            Page Not Found
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Typography variant="body1" paragraph sx={{ mb: 4, maxWidth: '600px' }}>
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable.
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
        >
          <Button
            component={Link}
            to="/"
            variant="contained"
            size="large"
            startIcon={<HomeIcon />}
            sx={{ mt: 2 }}
          >
            Back to Home
          </Button>
        </motion.div>
      </Box>
    </Container>
  );
}
