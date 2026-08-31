import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  Android as AndroidIcon,
  Apple as AppleIcon,
  GitHub as GitHubIcon,
  Language as WebIcon,
  Laptop as LinuxIcon,
  OpenInNew as OpenInNewIcon,
  PhoneIphone as IosIcon,
  Terminal as CliIcon,
  Window as WindowsIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { CATEGORIES, PLATFORMS, PRICING, PlatformId, PricingId } from '../content/gallery/types';
import { GallerySoftware } from '../utils/galleryLoader';

const platformIcons: Record<PlatformId, React.ReactNode> = {
  macos: <AppleIcon fontSize="small" />,
  windows: <WindowsIcon fontSize="small" />,
  linux: <LinuxIcon fontSize="small" />,
  ios: <IosIcon fontSize="small" />,
  android: <AndroidIcon fontSize="small" />,
  web: <WebIcon fontSize="small" />,
  cli: <CliIcon fontSize="small" />,
};

// Deliberately not blue: the category chip already owns `primary`, and two blue
// chips side by side read as one control.
const pricingColors: Record<PricingId, 'success' | 'warning' | 'default'> = {
  free: 'success',
  freemium: 'warning',
  paid: 'default',
};

const pricingHints: Record<PricingId, string> = {
  free: 'Free to use',
  freemium: 'Free to use, with paid tiers on top',
  paid: 'Paid, with at most a trial',
};

interface SoftwareCardProps {
  software: GallerySoftware;
  delay?: number;
}

const SoftwareCard: React.FC<SoftwareCardProps> = ({ software, delay = 0 }) => {
  const isGitHub = software.upstream.includes('github.com');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      style={{ height: '100%' }}
    >
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                flexShrink: 0,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                border: 1,
                borderColor: 'divider',
                backgroundColor: 'action.hover',
              }}
            >
              {software.logoUrl ? (
                <Box
                  component="img"
                  src={software.logoUrl}
                  alt={`${software.name} logo`}
                  loading="lazy"
                  sx={{ width: '100%', height: '100%', objectFit: 'contain', p: 0.5 }}
                />
              ) : (
                <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  {software.name.charAt(0)}
                </Typography>
              )}
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                {software.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {software.tagline}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
            <Chip label={CATEGORIES[software.category]} size="small" color="primary" />
            {software.platforms.map((platform) => (
              <Chip
                key={platform}
                icon={platformIcons[platform] as React.ReactElement}
                label={PLATFORMS[platform]}
                size="small"
                variant="outlined"
              />
            ))}
            <Tooltip title={pricingHints[software.pricing]}>
              <Chip
                label={PRICING[software.pricing]}
                size="small"
                color={pricingColors[software.pricing]}
              />
            </Tooltip>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <Box sx={{ mt: 'auto', display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <Button
              size="small"
              variant="contained"
              href={software.upstream}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={isGitHub ? <GitHubIcon /> : <OpenInNewIcon />}
            >
              {isGitHub ? 'GitHub' : 'Upstream'}
            </Button>
            {software.website && (
              <Button
                size="small"
                variant="outlined"
                href={software.website}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<WebIcon />}
              >
                Website
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SoftwareCard;
