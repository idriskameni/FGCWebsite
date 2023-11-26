import React from 'react';
import Box from '@mui/material/Box';
import { Popup } from 'react-leaflet';

interface TrainPredictionPopupProps {
}


const TrainPredictionPopup: React.FC<TrainPredictionPopupProps> = () => {

    return (
        <Popup>
            <Box sx={{ width: '300px' }}>
                <div style={{ padding: '20px', width: '300px' }}>
                    <p>
                        Aquest es el resultat de la teva última predicció.
                    </p>
                </div>
            </Box>
        </Popup>
    );
};

export default TrainPredictionPopup;