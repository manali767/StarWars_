import { memo, useState } from 'react';
import { TextField } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option) => option.label,
  });

// SearchableFilter component with search handling
const SearchableFilter = ({ label, options, onFilterChange }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = (event, newValue) => {
        setSelectedOption(newValue);
        onFilterChange(newValue);
    };

    return (
        <Autocomplete
            options={options}
            getOptionLabel={(option) => option.label || ''}
            value={selectedOption}
            onChange={handleChange}
            filterOptions={filterOptions}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    variant="outlined"
                    fullWidth
                />
            )}
            style={{ width: '100%' }}
        />
    );
};

export default memo(SearchableFilter);
