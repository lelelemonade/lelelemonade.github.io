import { useState, useRef, useEffect } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { VolumeUp as VolumeUpIcon } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const AudioPlayer = ({ audioFile, tooltipText }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioContext, setAudioContext] = useState(null);
  const [analyser, setAnalyser] = useState(null);
  const [animationFrameId, setAnimationFrameId] = useState(null);
  
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  
  // Initialize audio context
  useEffect(() => {
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (audioContext) {
        audioContext.close();
      }
    };
  }, [animationFrameId, audioContext]);
  
  const setupAudioContext = () => {
    // Create audio context if it doesn't exist
    if (!audioContext) {
      const newAudioContext = new (window.AudioContext || window.webkitAudioContext)();
      const newAnalyser = newAudioContext.createAnalyser();
      
      newAnalyser.fftSize = 256;
      newAnalyser.smoothingTimeConstant = 0.8;
      
      setAudioContext(newAudioContext);
      setAnalyser(newAnalyser);
      
      // Connect audio element to the audio context
      const source = newAudioContext.createMediaElementSource(audioRef.current);
      source.connect(newAnalyser);
      newAnalyser.connect(newAudioContext.destination);
    }
  };
  
  const visualize = () => {
    if (!analyser || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const draw = () => {
      if (!isPlaying) return;
      
      setAnimationFrameId(requestAnimationFrame(draw));
      
      analyser.getByteFrequencyData(dataArray);
      
      ctx.clearRect(0, 0, width, height);
      
      // Draw audio visualization
      const barWidth = (width / bufferLength) * 2.5;
      let x = 0;
      
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 2;
        
        // Create gradient for bars
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#90caf9');
        gradient.addColorStop(1, '#1976d2');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, height - barHeight, barWidth, barHeight);
        
        x += barWidth + 1;
      }
    };
    
    draw();
  };
  
  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        setAnimationFrameId(null);
      }
    } else {
      setupAudioContext();
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
      visualize();
    }
  };
  
  const handleAudioEnded = () => {
    setIsPlaying(false);
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      setAnimationFrameId(null);
    }
  };
  
  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', position: 'relative' }}>
      <audio 
        ref={audioRef} 
        src={audioFile} 
        onEnded={handleAudioEnded}
        style={{ display: 'none' }}
      />
      
      <Tooltip title={tooltipText || "Play audio"}>
        <IconButton 
          onClick={togglePlay}
          color="inherit"
          sx={{ 
            position: 'relative',
            zIndex: 2,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)'
            }
          }}
        >
          <motion.div
            animate={isPlaying ? { scale: [1, 1.2, 1] } : { scale: 1 }}
            transition={{ repeat: isPlaying ? Infinity : 0, duration: 1.5 }}
          >
            <VolumeUpIcon />
          </motion.div>
        </IconButton>
      </Tooltip>
      
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 120 }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.3 }}
            style={{ 
              position: 'absolute',
              left: '100%',
              height: '40px',
              overflow: 'hidden',
              marginLeft: '8px',
              borderRadius: '20px'
            }}
          >
            <canvas 
              ref={canvasRef} 
              width={120} 
              height={40}
              style={{ 
                borderRadius: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default AudioPlayer;
