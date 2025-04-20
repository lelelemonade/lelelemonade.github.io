import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  Container, 
  useMediaQuery, 
  Fab, 
  Zoom,
  CssBaseline,
  ThemeProvider
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Home as HomeIcon, 
  Article as ArticleIcon, 
  Newspaper as NewsIcon, 
  DarkMode as DarkModeIcon, 
  LightMode as LightModeIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

const navItems = [
  { name: 'Home', path: '/', icon: <HomeIcon /> },
  { name: 'Blog', path: '/blog', icon: <ArticleIcon /> },
  { name: 'News', path: '/news', icon: <NewsIcon /> },
];

export default function MainLayout() {
  const { theme, mode, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
      
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        ZhongLi Shen
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem 
            key={item.name} 
            component={Link} 
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              color: 'text.primary',
              '&.Mui-selected': {
                backgroundColor: 'action.selected',
                color: 'primary.main',
              }
            }}
          >
            <Box sx={{ mr: 1 }}>{item.icon}</Box>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar 
          position="sticky" 
          sx={{
            backgroundColor: scrolled ? 'background.paper' : 'transparent',
            boxShadow: scrolled ? 1 : 0,
            transition: 'all 0.3s ease',
            backdropFilter: scrolled ? 'blur(10px)' : 'none',
          }}
          elevation={scrolled ? 4 : 0}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                flexGrow: 1,
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <HomeIcon sx={{ mr: 1 }} />
              </motion.div>
              ZhongLi Shen
            </Typography>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  component={Link}
                  to={item.path}
                  sx={{ 
                    color: 'inherit',
                    mx: 1,
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: location.pathname === item.path ? '100%' : '0%',
                      height: '2px',
                      bottom: 0,
                      left: 0,
                      backgroundColor: 'primary.main',
                      transition: 'width 0.3s ease'
                    },
                    '&:hover::after': {
                      width: '100%'
                    }
                  }}
                  startIcon={item.icon}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
            <IconButton color="inherit" onClick={toggleTheme} sx={{ ml: 1 }}>
              {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1,
            py: 3,
            px: { xs: 2, md: 4 },
            transition: 'padding 0.3s ease'
          }}
        >
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Outlet />
            </motion.div>
          </Container>
        </Box>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: 'background.paper',
            borderTop: 1,
            borderColor: 'divider',
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="body2" color="text.secondary" align="center">
              © {new Date().getFullYear()} ZhongLi Shen. All rights reserved.
            </Typography>
          </Container>
        </Box>
        <Zoom in={showScrollTop}>
          <Box
            role="presentation"
            sx={{
              position: 'fixed',
              bottom: 16,
              right: 16,
              zIndex: 1000,
            }}
          >
            <Fab
              color="primary"
              size="small"
              aria-label="scroll back to top"
              onClick={scrollToTop}
            >
              <KeyboardArrowUpIcon />
            </Fab>
          </Box>
        </Zoom>
      </Box>
    </ThemeProvider>
  );
}
