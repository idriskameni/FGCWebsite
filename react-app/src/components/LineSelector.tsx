import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

import { LinesData } from '../types';

interface LineSelectorProps {	
    lineName: string[];
    handleChange: (event: SelectChangeEvent<string[]>) => void;
    railwayData: LinesData[];
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const LineSelector: React.FC<LineSelectorProps> = ({ lineName, handleChange, railwayData }) => {

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300, position: 'relative', zIndex: 20, top: '10px' }}>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={lineName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {railwayData.map((line, index) => (
            <MenuItem key={index} value={line.route_id}>
              <Checkbox checked={lineName.indexOf(line.route_id) > -1} />
              <ListItemText primary={line.route_id} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default LineSelector;