import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const sortedRailwayData = [...railwayData].sort((a, b) => a.route_id.localeCompare(b.route_id));

  return (
    <div>
      <Button onClick={handleClickOpen} sx={{backgroundColor: '#282c34', color: 'white', fontWeight: 'bold', height: '45px', '&:hover': { backgroundColor: '#282c34' }}}>Selecciona la línia del teu interés</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Selecciona la línia del teu interés</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
            <FormControl sx={{ m: 1, minWidth: 120, width: '100%' }}>
              <InputLabel htmlFor="demo-dialog-native">Línia</InputLabel>
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
                {sortedRailwayData.map((line, index) => (
                  <MenuItem key={index} value={line.route_id}>
                    <Checkbox checked={lineName.indexOf(line.route_id) > -1} />
                    <ListItemText primary={line.route_id} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default LineSelector;