import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, Typography, Skeleton, CardMedia } from '@mui/material';
import Droid from "../Droid.jfif";
import Human from "../Human.jfif";
import CharacterModal from './CharacterModal';

// to generate a color from species name
function generateColorFromName(name) {
  let hash = 0;

  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ('00' + value.toString(16)).slice(-2);
  }
  return color;
}


const CharacterCard = ({ character }) => {
  const [speciesName, setSpecies] = useState('Unknown Species');
  const [homeworldDetails, setHomeworldDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  // Fetch species name
  const fetchSpeciesName = async (speciesUrl) => {
    try {
      const response = await fetch(speciesUrl);
      if (!response.ok) throw new Error('Failed to fetch species data');
      const data = await response.json();
      setSpecies(data.name);
      setLoading(false);
    } catch (error) {
      setError('An unexpected error occurred');
    }
  };

  // Fetch homeworld details
  const fetchHomeworldDetails = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch homeworld details');
      const data = await response.json();
      setHomeworldDetails(data);
    } catch (error) {
      setError('An unexpected error occurred');
    }
  };

  useEffect(() => {
    setLoading(true);
    if (character.species.length) {
      fetchSpeciesName(character.species[0]);
    } else {
      setSpecies('Unknown Species');
      setLoading(false);
    }

    fetchHomeworldDetails(character.homeworld);
  }, [character.species, character.homeworld]);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <>
      <Card
        sx={{
          background: loading
            ? 'linear-gradient(to right, #e0e0e0, #eeeeee)'
            : `linear-gradient(to right, ${generateColorFromName(speciesName)}, #eeeeee)`,
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0px 16px 32px rgba(0, 0, 0, 0.2)',
          },
        }}
        onClick={handleOpen}
      >
        {loading ? (
          <>
            <Skeleton variant="rectangular" width="100%" height="50vh" />
            <CardContent>
              <Skeleton variant="text" width="60%" height={32} />
              <Skeleton variant="text" width="40%" height={24} />
            </CardContent>
          </>
        ) : (
          <>
            <CardMedia
              component="img"
              image={speciesName === 'Unknown Species' ? Human : Droid}
              sx={{ height: '50vh', objectFit: 'cover' }}
              title={character.name}
            />
            <CardContent sx={{ textAlign: 'center', padding: '16px' }}>
              <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: '8px' }}>
                {character.name}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: '#616161' }}>
                Species: {speciesName}
              </Typography>
            </CardContent>
          </>
        )}
      </Card>

      {homeworldDetails && (
        <CharacterModal
          open={open}
          onClose={handleClose}
          character={character}
          homeworldDetails={homeworldDetails}
        />
      )}
    </>
  );
};

export default CharacterCard;
