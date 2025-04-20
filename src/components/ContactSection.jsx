import {Box, Typography, Container, IconButton, Paper, Tooltip, Grid} from '@mui/material';
import {motion} from 'framer-motion';
import {
    Email as EmailIcon,
    GitHub as GitHubIcon,
    LinkedIn as LinkedInIcon
} from '@mui/icons-material';
import {useTheme} from '../hooks/useTheme';

// Discord icon SVG component
function DiscordIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 127.14 96.36"
            fill="currentColor"
        >
            <path
                d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
        </svg>
    );
}

// LeetCode icon SVG component
function LeetCodeIcon() {
    return (
        <svg
            height="32"
            viewBox="0 0 32 32"
            width="32"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="m21.469 23.907-3.595 3.473c-.624.625-1.484.885-2.432.885s-1.807-.26-2.432-.885l-5.776-5.812c-.62-.625-.937-1.537-.937-2.485 0-.952.317-1.812.937-2.432l5.76-5.844c.62-.619 1.5-.859 2.448-.859s1.808.26 2.432.885l3.595 3.473c.687.688 1.823.663 2.536-.052.708-.713.735-1.848.047-2.536l-3.473-3.511c-.901-.891-2.032-1.505-3.261-1.787l3.287-3.333c.688-.687.667-1.823-.047-2.536s-1.849-.735-2.536-.052l-13.469 13.469c-1.307 1.312-1.989 3.113-1.989 5.113 0 1.996.683 3.86 1.989 5.168l5.797 5.812c1.307 1.307 3.115 1.937 5.115 1.937 1.995 0 3.801-.683 5.109-1.989l3.479-3.521c.688-.683.661-1.817-.052-2.531s-1.849-.74-2.531-.052zm6.28-6.558h-13.531c-.932 0-1.692.801-1.692 1.791 0 .991.76 1.797 1.692 1.797h13.531c.933 0 1.693-.807 1.693-1.797 0-.989-.76-1.791-1.693-1.791z"/>
        </svg>
    );
}

export default function ContactSection() {
    const {mode} = useTheme();

    const socialLinks = [
        {
            name: 'Email',
            icon: <EmailIcon fontSize="large"/>,
            url: 'mailto:germanysoftwareengineer@gmail.com',
            color: '#EA4335'
        },
        {
            name: 'GitHub',
            icon: <GitHubIcon fontSize="large"/>,
            url: 'https://github.com/lelelemonade',
            color: '#171515'
        },
        {
            name: 'LinkedIn',
            icon: <LinkedInIcon fontSize="large"/>,
            url: 'https://www.linkedin.com/in/shen-zhongli/',
            color: '#0A66C2'
        },
        {
            name: 'LeetCode',
            icon: <LeetCodeIcon/>,
            url: 'https://leetcode.com/u/lelelemonade/',
            color: '#FFA116'
        },
        {
            name: 'Discord',
            icon: <DiscordIcon/>,
            url: 'https://discord.com/users/cacacarrot1',
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
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.5}}
                >
                    <Typography
                        component="h2"
                        variant="h3"
                        align="center"
                        gutterBottom
                        sx={{mb: 4, fontWeight: 'bold'}}
                    >
                        Get In Touch
                    </Typography>

                    <Typography
                        variant="h6"
                        align="center"
                        color="text.secondary"
                        paragraph
                        sx={{maxWidth: 700, mx: 'auto', mb: 6}}
                    >
                        Feel free to reach out to me through any of these platforms. I'm always open to discussing new
                        projects, creative ideas, or opportunities to be part of your vision.
                    </Typography>
                </motion.div>

                <Grid container spacing={3} justifyContent="center">
                    {socialLinks.map((link, index) => (
                        <Grid item key={link.name}>
                            <motion.div
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true}}
                                transition={{duration: 0.5, delay: index * 0.1}}
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
