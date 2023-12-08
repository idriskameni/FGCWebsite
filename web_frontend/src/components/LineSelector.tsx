import React from 'react';
import Button from '@mui/material/Button';

// Define the props interface for LineSelector
interface LineSelectorProps {
    positions: PositionsEntry[]; // The positions data
    routes: RouteEntry[]; // The available routes
    selectedRoutes: string[]; // The currently selected routes
    setSelectedRoutes: React.Dispatch<React.SetStateAction<string[]>>; // Function to update selected routes
}

// Define the LineSelector functional component
const LineSelector: React.FC<LineSelectorProps> = ({ positions, routes, selectedRoutes, setSelectedRoutes }) => {
    // Create a Set of route IDs from positions
    const routeIdsFromPositions = new Set(positions.map(position => position.lin));

    // Filter routes the same way as before, but also ensure they are in the selected routes
    const railRoutes = routes.filter(route => 
        route.route_type === 'Rail' && routeIdsFromPositions.has(route.route_id)
    );

    // Function to handle the change event when selecting routes
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
    
    // Function to open the dialog for selecting lines
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Function to handle the close event of the dialog
    const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
    if (reason !== 'backdropClick') {
        setOpen(false);
    }
    };

    return (
        <>
            <div>
                {/* Button to open the dialog */}
                <Button 
                    onClick={handleClickOpen} // Set the click event handler
                    sx={{ 
                        m: 1, 
                        width: 300, 
                        height: 20, 
                        fontSize: '12px',
                        color: 'white',
                        zIndex: 100,
                        borderRadius: '4px',
                    }}
                >
                    SELECCIONA LES LÍNIES {/* Display the button label */}
                </Button>
                {/* Dialog for selecting lines */}
                <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                    <DialogTitle>
                        Selecciona les línies del teu interès
                    </DialogTitle>
                    <DialogContent>
                        {/* Form control for selecting lines */}
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
                                    {/* Select component for choosing lines */}
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
                                            {/* Checkbox for each line */}
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
                    {/* Dialog actions */}
                    <DialogActions>
                        <Button onClick={handleClose}>Ok</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}

export default LineSelector; // Export the LineSelector component
