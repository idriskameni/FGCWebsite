import React from 'react';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox, { checkboxClasses } from '@mui/material/Checkbox';
import { PositionsEntry, RouteEntry } from '../types';
import AppButton from './AppButton';


interface LineSelectorProps {
    positions: PositionsEntry[];
    routes: RouteEntry[];
    selectedRoutes: string[];
    setSelectedRoutes: React.Dispatch<React.SetStateAction<string[]>>;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
        height: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
    },
  },
};


const LineSelector: React.FC<LineSelectorProps> = ({ positions, routes, selectedRoutes, setSelectedRoutes }) => {

    // Create a Set of route IDs from positions
    const routeIdsFromPositions = new Set(positions.map(position => position.lin));

    // Filter routes the same way as before, but also ensure they are in the selected routes
    const railRoutes = routes.filter(route => 
        route.route_type === 'Rail' && routeIdsFromPositions.has(route.route_id)
    );

    const handleChange = (event: SelectChangeEvent<typeof selectedRoutes>) => {
      const {
        target: { value },
      } = event;
      setSelectedRoutes(
        typeof value === 'string' ? value.split(',') : value,
      );
    };
    
    // Check if railRoutes array is empty
    const isLoading = railRoutes.length === 0;

    const [open, setOpen] = React.useState(false);
    const [age, setAge] = React.useState<number | string>('');

    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
    if (reason !== 'backdropClick') {
        setOpen(false);
    }
    };

    return (
        <>
            <div>
                <AppButton handleClickOpen={handleClickOpen}>SELECCIONA LES LÍNIES</AppButton>
                <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                    <DialogTitle>
                        Selecciona les línies del teu interès
                    </DialogTitle>
                    <DialogContent>
                        <FormControl sx={{ m: 1, width: 300, height: 35, z: 100 }}>
                            {isLoading ? (
                                <div style={{color: '#282c34', textAlign: 'center', paddingTop: '5px'}}>
                                    Carregant línies...
                                </div>
                            ) : (
                                <>
                                    <InputLabel 
                                        id="demo-multiple-checkbox-label" 
                                        sx={{ 
                                            color: '#282c34',
                                            fontSize: '12px',
                                            lineHeight: '15px',
                                            '&.Mui-focused': {
                                                color: '#282c34'
                                            }
                                        }}
                                        >
                                            LÍNIES
                                    </InputLabel>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        multiple
                                        value={selectedRoutes}
                                        onChange={handleChange}
                                        input={<OutlinedInput label="Routes" sx={{ color: '#282c34' }}/>}
                                        renderValue={(selected) => 
                                            selected.map(id => routes.find(route => route.route_id === id)?.route_short_name).join(', ')
                                        }
                                        MenuProps={MenuProps}
                                        // Custom style for underline
                                        sx={{
                                            height: 35,
                                            color: '#282c34',
                                            backgroundColor: 'white',
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#282c34', // Change as needed
                                            },
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#282c34', // Change as needed
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#282c34', // Change as needed
                                            },
                                            '& .MuiSelect-icon': {
                                                color: '#282c34', // Replace with the desired arrow color
                                            },
                                            '& .Mui-focused': {
                                                color: '#282c34' // Color when focused (clicked)
                                            }
                                        }}
                                    >
                                    {railRoutes.map((route) => (
                                        <MenuItem key={route.route_id} value={route.route_id} sx={{ color: '#282c34' }}>
                                            <Checkbox 
                                                checked={selectedRoutes.indexOf(route.route_id) > -1} 
                                                sx={{
                                                [`&, &.${checkboxClasses.checked}`]: {
                                                    color: '#282c34',
                                                },
                                                }}
                                            />
                                            <ListItemText primary={route.route_short_name} sx={{ color: '#282c34' }}/>
                                        </MenuItem>
                                    ))}
                                    </Select>
                                </>
                            )}
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Ok</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );

}

export default LineSelector;
