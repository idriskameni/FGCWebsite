import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { LinesData, PositionsData } from '../types';

interface LineSelectorProps {	
  lineNames: string[];
  railwayData: LinesData[];
  positionsData: PositionsData[];
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

const LineSelector: React.FC<LineSelectorProps> = ({ lineNames, railwayData, positionsData }) => {

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState<string[]>(['']);

  const handleChange = (event: SelectChangeEvent<string[] | string>) => {
    const selectedValues = Array.isArray(event.target.value) ? event.target.value : [event.target.value];
    setSelectedValue(selectedValues);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };
  
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
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedValue} 
                onChange={handleChange}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {lineNames.map((line, index) => (
                  <MenuItem key={index} value={line}>
                    <ListItemText primary={line} />
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