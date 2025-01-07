import { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function Filters({onChange}) {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Filter by</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="" control={<Radio />} label="All" />
        <FormControlLabel value="finished" control={<Radio />} label="Finished products" />
        <FormControlLabel value="marketing_end_date" control={<Radio />} label="Not avaliable" />
        <FormControlLabel value="marketing_start_date" control={<Radio />} label="New products" />
        <FormControlLabel value="sponsor_name" control={<Radio />} label="Sponsor Name" />
        <FormControlLabel value="submissions" control={<Radio />} label="Submissions" />
      </RadioGroup>
    </FormControl>
  );
}

