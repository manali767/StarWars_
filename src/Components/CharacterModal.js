import { Box, Typography, Divider, IconButton, Modal } from '@mui/material';
import Grid from '@mui/material/Grid2';
import HomeIcon from '@mui/icons-material/Home';
import HeightIcon from '@mui/icons-material/Height';
import MovieIcon from '@mui/icons-material/Movie';
import DateRangeIcon from '@mui/icons-material/DateRange';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import PublicIcon from '@mui/icons-material/Public';
import CloseIcon from '@mui/icons-material/Close';
import TerrainIcon from '@mui/icons-material/Terrain';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { memo } from 'react';

// date formatting
const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString();
};

const CharacterModal = ({ open, onClose, character, homeworldDetails }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: '12px',
          p: 3,
        }}
      >

        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h4" sx={{ textAlign: 'center', mb: 2, fontWeight: 600 }}>
          {character.name}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
              <HeightIcon sx={{ mr: 1 }} /> Height: {character.height}m
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
              <WbSunnyIcon sx={{ mr: 1 }} /> Birth Year: {character.birth_year}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
              <MovieIcon sx={{ mr: 1 }} /> Films: {character.films.length}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
              <DateRangeIcon sx={{ mr: 1 }} /> Created: {formatDate(character.created)}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1, fontWeight: 500 }}>
          <HomeIcon sx={{ mr: 1 }} /> Homeworld
        </Typography>

        {homeworldDetails ? (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                <PublicIcon sx={{ mr: 1 }} /> Name: {homeworldDetails.name}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                <TerrainIcon sx={{ mr: 1 }}  /> Terrain: {homeworldDetails.terrain}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                <ThermostatIcon sx={{ mr: 1 }} /> Climate: {homeworldDetails.climate}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                <PeopleAltIcon sx={{ mr: 1 }} /> Population: {homeworldDetails.population}
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <Typography sx={{ textAlign: 'center' }}>No homeworld details available.</Typography>
        )}
      </Box>
    </Modal>
  );
};

export default memo(CharacterModal);
