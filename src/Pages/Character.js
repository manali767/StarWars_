import React, { useCallback, useEffect, useState } from 'react';
import { Snackbar, Alert, CircularProgress, Container, Button, TextField, Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import CharacterCard from '../Components/CharacterCard';
import SearchableFilter from '../Components/SearchAndFilter';
import Header from '../Components/Header';

const RippleLoader = () => (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <CircularProgress
            thickness={5}
            sx={{
                animation: 'pulse 1.2s infinite ease-in-out',
            }}
        />
        <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
);

const Character = () => {
    const [characters, setCharacters] = useState([]);
    const [filmNames, setFilmNames] = useState([]);
    const [speciesName, setSpeciesName] = useState([]);
    const [homeWorldName, setHomeWorldName] = useState([]);
    const [filterFilmName, setFilterFilmName] = useState(null);
    const [filterSpeciesName, setFilterSpeciesName] = useState(null);
    const [filterHomeWorldName, setFilterHomeWorldName] = useState(null);
    const [searchName, setSearchName] = useState('');
    const [loading, setLoading] = useState(false);
    const [pageNumber, setPage] = useState(1)
    const [error, setError] = useState(null);

    // fetching character details
    useEffect(() => {
        fetchCharacters();
    }, [pageNumber]);

    const fetchCharacters = async () => {
        setLoading(true)
        try {
            const response = await fetch(`https://swapi.dev/api/people/?page=${pageNumber}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            setCharacters(data.results);
        } catch (error) {
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    //fetching film, species and homeworld details for dropdown filter data
    useEffect(() => {
        getFilmsName();
        fetchAllSpecies();
        fetchAllHomeWorld();
    }, [])

    const getFilmsName = async () => {
        try {
            const response = await fetch(`https://swapi.dev/api/films`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            if (data.results) {
                data.results.map((value, index) => {
                    setFilmNames((prevFilmNames) => [...prevFilmNames, { label: value.title, id: index + 1 }]);
                })
            }
        } catch (error) {
            setError('An unexpected error occurred');
        }
    };

    const fetchAllSpecies = async () => {
        const baseUrl = "https://swapi.dev/api/species/";
        let pageNumber = 1;
        let totalPages = 1;

        while (pageNumber <= totalPages) {

            try {
                const response = await fetch(`${baseUrl}?page=${pageNumber}`);
                const data = await response.json();

                if (data.results) {
                    data.results.map((value, index) => {
                        setSpeciesName((prevSpeciesName) => [...prevSpeciesName, { label: value.name, id: index + 1 }]);
                    })
                }

                if (pageNumber === 1) {
                    totalPages = Math.ceil(data.count / data.results.length);
                }

                pageNumber++;
            } catch (error) {
                setError('An unexpected error occurred');
            }

        }
    }

    const fetchAllHomeWorld = async () => {
        const baseUrl = "https://swapi.dev/api/planets/";
        let pageNumber = 1;
        let totalPages = 1;

        while (pageNumber <= totalPages) {
            try {
                const response = await fetch(`${baseUrl}?page=${pageNumber}`);
                const data = await response.json();

                if (data.results) {
                    data.results.map((value, index) => {
                        setHomeWorldName((prevHomeWorldName) => [...prevHomeWorldName, { label: value.name, id: index + 1 }]);
                    })
                }

                if (pageNumber === 1) {
                    totalPages = Math.ceil(data.count / data.results.length);
                }

                pageNumber++;
            }
            catch (error) {
                setError('An unexpected error occurred');
            }
        }
    }

    // event function for dropdown filter
    const handleFilterFilmChange = useCallback((selectedOption) => {
        setFilterFilmName(selectedOption);
    }, [])

    const handleFilterSpeciesChange = useCallback((selectedOption) => {
        setFilterSpeciesName(selectedOption);
    }, [])

    const handleFilterHomeWorldChange = useCallback((selectedOption) => {
        setFilterHomeWorldName(selectedOption);
    }, [])

    // event function for search
    const handleSearchChange = (event) => {
        setSearchName(event.target.value.toLowerCase());
    };

    // search and filter functinality
    const filteredCharacters = characters.filter(character => {
        const matchesFilm = filterFilmName
            ? character.films.some(film => film.includes(filterFilmName.id))
            : true;

        const matchesSpecies = filterSpeciesName
            ? character.species.some(specie => specie.includes(filterSpeciesName.id))
            : true;

        const matchesHomeWorld = filterHomeWorldName
            ? character.homeworld.includes(filterHomeWorldName.id)
            : true;

        const matchesSearch = character.name.toLowerCase().includes(searchName.toLowerCase());

        return matchesFilm && matchesSpecies && matchesHomeWorld && matchesSearch;
    });

    const handleClose = () => setError(null); // Close Snackbar

    return (
        <>
            <Header />
            <Snackbar
                open={!!error}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
            <Container style={{ marginTop: '100px', marginBottom: '20px' }}>
                <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                    <Grid size={{ xs: 6, sm: 6, md: 3 }} >
                        <TextField id="outlined-basic" label="Name" variant="outlined" sx={{ width: '100%' }} onChange={handleSearchChange} />
                    </Grid>
                    <Grid size={{ xs: 6, sm: 6, md: 3 }} >
                        <SearchableFilter label={'Search Homeworld'} options={homeWorldName} onFilterChange={handleFilterHomeWorldChange} />
                    </Grid>
                    <Grid size={{ xs: 6, sm: 6, md: 3 }} >
                        <SearchableFilter label={'Search Film'} options={filmNames} onFilterChange={handleFilterFilmChange} />
                    </Grid>
                    <Grid size={{ xs: 6, sm: 6, md: 3 }} >
                        <SearchableFilter label={'Search Species'} options={speciesName} onFilterChange={handleFilterSpeciesChange} />
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button disabled={pageNumber === 1} variant="outlined" sx={{ marginTop: '20px', marginBottom: '20px' }} onClick={() => setPage((prev) => prev - 1)}>Previous Page</Button>
                    <Typography>Page {pageNumber}</Typography>
                    <Button disabled={pageNumber === 9} variant="outlined" sx={{ marginTop: '20px', marginBottom: '20px' }} onClick={() => setPage((prev) => prev + 1)}>Next Page</Button>
                </Box>
                {loading ? (
                    <RippleLoader />
                ) : (
                    <Grid container spacing={2}>
                        {
                            filteredCharacters.length ?
                                <>
                                    {
                                        filteredCharacters.map((char) => (
                                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={char.name}>
                                                <CharacterCard character={char} />
                                            </Grid>
                                        ))
                                    }
                                </>
                                : <Typography sx={{ margin: 'auto' }}>No data found</Typography>
                        }
                    </Grid>
                )}
            </Container>
        </>
    );
};

export default Character;
