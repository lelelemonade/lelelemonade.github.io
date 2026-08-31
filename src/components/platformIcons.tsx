import React from 'react';
import {
  Android as AndroidIcon,
  Apple as AppleIcon,
  Language as WebIcon,
  Laptop as LinuxIcon,
  PhoneIphone as IosIcon,
  Terminal as CliIcon,
  Window as WindowsIcon,
} from '@mui/icons-material';
import { PlatformId } from '../content/gallery/types';

/** One icon per platform, shared by the Gallery cards and the platform filter. */
export const platformIcons: Record<PlatformId, React.ReactElement> = {
  macos: <AppleIcon fontSize="small" />,
  windows: <WindowsIcon fontSize="small" />,
  linux: <LinuxIcon fontSize="small" />,
  ios: <IosIcon fontSize="small" />,
  android: <AndroidIcon fontSize="small" />,
  web: <WebIcon fontSize="small" />,
  cli: <CliIcon fontSize="small" />,
};
