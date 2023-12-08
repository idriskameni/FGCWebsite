import React from 'react';
import Box from '@mui/material/Box';
import { Popup } from 'react-leaflet';

// Define the props interface for TrainPredictionPopup
interface TrainPredictionPopupProps {
    id: string;
    time: string;
}

// Define the TrainPredictionPopup functional component
const TrainPredictionPopup: React.FC<TrainPredictionPopupProps> = ({ id, time }) => {

    return (
        <Popup>
            <Box sx={{ width: '300px' }}>
                <div style={{ padding: '20px', width: '300px' }}>
                    {/* Display a message about the prediction result */}
                    <p>
                        Aquest és el resultat de la teva última predicció. 
                    </p>
                    <p>
                        {/* Display the predicted arrival time */}
                        El tren arribarà a aquesta posició a les: <br />{time}.
                    </p>
                </div>
            </Box>
        </Popup>
    );
};

export default TrainPredictionPopup; // Export the TrainPredictionPopup component
