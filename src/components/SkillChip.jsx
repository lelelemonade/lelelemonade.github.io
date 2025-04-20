import { Chip } from '@mui/material';
import { motion } from 'framer-motion';

const SkillChip = ({ skill }) => {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.1, 
        y: -5,
        transition: { type: 'spring', stiffness: 300 }
      }}
    >
      <Chip
        label={skill}
        sx={{
          m: 0.5,
          fontWeight: 500,
          fontSize: '0.9rem',
          py: 2.5,
          borderRadius: 2,
          backgroundColor: theme => theme.palette.mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.1)' 
            : 'rgba(0, 0, 0, 0.05)',
          color: 'text.primary',
          '&:hover': {
            backgroundColor: theme => theme.palette.mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.2)' 
              : 'rgba(0, 0, 0, 0.1)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }
        }}
      />
    </motion.div>
  );
};

export default SkillChip;
