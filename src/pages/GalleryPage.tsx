import React, { useMemo, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import SoftwareCard from '../components/SoftwareCard';
import { CategoryId } from '../content/gallery/types';
import { getCategories, getGallery } from '../utils/galleryLoader';

const GalleryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<CategoryId[]>([]);

  const software = useMemo(() => getGallery(), []);
  const categories = useMemo(() => getCategories(software), [software]);

  const filteredSoftware = useMemo(() => {
    const term = searchTerm.toLowerCase();

    return software.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(term) ||
        item.tagline.toLowerCase().includes(term) ||
        item.features.some((feature) => feature.toLowerCase().includes(term));

      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(item.category);

      return matchesSearch && matchesCategory;
    });
  }, [software, searchTerm, selectedCategories]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryClick = (category: CategoryId): void => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  return (
    <Container maxWidth="lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            mb: 4,
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
          Gallery
        </Typography>
      </motion.div>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Software I actually use and think is really good — with its upstream project, the
        platforms it runs on and what it does well.
      </Typography>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search software..."
          value={searchTerm}
          onChange={handleSearchChange}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
          sx={{ mb: 3 }}
        />

        {categories.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {categories.map((category) => (
              <Chip
                key={category.id}
                label={`${category.label} (${category.count})`}
                clickable
                color={selectedCategories.includes(category.id) ? 'primary' : 'default'}
                onClick={() => handleCategoryClick(category.id)}
              />
            ))}
          </Box>
        )}
      </Box>

      {filteredSoftware.length > 0 ? (
        <Grid container spacing={3}>
          {filteredSoftware.map((item, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={item.id}>
              <SoftwareCard software={item} delay={index} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Card sx={{ p: 3, textAlign: 'center' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              No software found
            </Typography>
            <Typography variant="body1">
              {searchTerm || selectedCategories.length > 0
                ? 'Try adjusting your search or filters.'
                : 'Add entries to src/content/gallery/index.ts to see them here.'}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default GalleryPage;
