import React from 'react';
import Box from '@mui/material/Box';
import { Popup } from 'react-leaflet';

interface TrainPredictionPopupProps {
    id: string;
    time: string;
}


const TrainPredictionPopup: React.FC<TrainPredictionPopupProps> = ({ id, time }) => {

    return (
        <Popup>
            <Box sx={{ width: '300px' }}>
                <div style={{ padding: '20px', width: '300px' }}>
                    <p>
                        Aquest es el resultat de la teva última predicció. 
                    </p>
                    <p>
                        El tren arribarà a aquesta posició a les: <br />{time}.
                    </p>
                </div>
            </Box>
        </Popup>
    );
};

export default TrainPredictionPopup;