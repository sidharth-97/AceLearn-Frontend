import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

export default function SearchInput({data}) {
  return (
    <Stack spacing={2} sx={{ width: 400 }}>
     
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={data.map((option) => option.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Tutors"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
    </Stack>
  );
}

