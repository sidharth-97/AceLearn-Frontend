import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useNavigate } from 'react-router-dom';

export default function ColorToggleButton() {
  const [alignment, setAlignment] = React.useState('student');
  const navigate = useNavigate();

  const handleChange = (
    _e: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    if (newAlignment) {
      navigate(`/${newAlignment}/login`);
      setAlignment(newAlignment);
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="student">Student Login</ToggleButton>
      <ToggleButton value="tutor">Tutor Login</ToggleButton>
    </ToggleButtonGroup>
  );
}
