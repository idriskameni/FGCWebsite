import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import AppButton from './AppButton';


interface PredictionSelectorProps {

}

const PredictionSelector: React.FC<PredictionSelectorProps> = () => {

    const [open, setOpen] = React.useState(false);
    const [age, setAge] = React.useState<number | string>('');

    const handleChange = (event: SelectChangeEvent<typeof age>) => {
        setAge(Number(event.target.value) || '');
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
        <>
            <div>
                <AppButton handleClickOpen={handleClickOpen}>Fes una predicció</AppButton>
                <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                    <DialogTitle>
                        Fes una predicció
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Selecciona la línia, el ID del viatge i el temps de la predicció
                        </DialogContentText>
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
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
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Ok</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );

}

export default PredictionSelector;
