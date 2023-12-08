import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import AppButton from './AppButton';

// Define the props interface for PredictionSelector
interface PredictionSelectorProps {

}

// Define the PredictionSelector functional component
const PredictionSelector: React.FC<PredictionSelectorProps> = () => {
    // State to manage the open/close state of the dialog
    const [open, setOpen] = React.useState(false);

    // State to store the selected age (in this case, age represents a value)
    const [age, setAge] = React.useState<number | string>('');

    // Function to handle the change in the Select component
    const handleChange = (event: SelectChangeEvent<typeof age>) => {
        setAge(Number(event.target.value) || '');
    };

    // Function to open the dialog
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Function to close the dialog
    const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };

    return (
        <>
            <div>
                {/* Render the AppButton component with a click handler */}
                <AppButton handleClickOpen={handleClickOpen}>Fes una predicció</AppButton>
                {/* Render the Dialog component with open/close state and content */}
                <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                    <DialogTitle>
                        Fes una predicció
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {/* Explanation of the dialog content */}
                            Selecciona la línia, el ID del viatge i el temps de la predicció
                        </DialogContentText>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            {/* Render three Select components for selecting "Línia" */}
                            <Select
                                value={age}
                                onChange={handleChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                sx={{ m: 1, width: '75%', height: 35, z: 100, position: 'absolute' }}
                            >
                                Línia
                            </Select>
                            <Select
                                value={age}
                                onChange={handleChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                sx={{ m: 1, width: '75%', height: 35, z: 100, position: 'absolute' }}
                            >
                                Línia
                            </Select>
                            <Select
                                value={age}
                                onChange={handleChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                sx={{ m: 1, width: '75%', height: 35, z: 100, position: 'absolute' }}
                            >
                                Línia
                            </Select>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        {/* Render Cancel and Ok buttons */}
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Ok</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}

export default PredictionSelector; // Export the PredictionSelector component
