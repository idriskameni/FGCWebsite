import React, { useState } from 'react';
import L from 'leaflet';
import { Marker } from 'react-leaflet';
import predictionIcon from '../assets/images/prediction-icon.png';
import TrainPredictionPopup from './TrainPredictionPopup';

// Define the props interface for TrainPrediction
interface TrainPredictionProps {
    latitude: number;
    longitude: number;
    id: string;
    time: string;
}

// Define the TrainPrediction functional component
const TrainPrediction: React.FC<TrainPredictionProps> = ({ latitude, longitude, id, time }) => {

    // State to control whether the popup is open or not
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(true);

    // Define the train marker icon using Leaflet
    const trainMarkerIcon = L.icon({
        iconUrl: predictionIcon,
        iconSize: [25, 25], // Size of the icon
        iconAnchor: [12, 12], // Center the icon over the location
        popupAnchor: [0, -12], // Point from which the popup should open relative to the iconAnchor
    });

    // Function to handle marker click and open the popup
    const handleMarkerClick = () => {
        setIsPopupOpen(true); // Show the Popup
    };

    return (
        <>
            <Marker 
                key={id} 
                position={[latitude, longitude]} 
                icon={trainMarkerIcon}
                eventHandlers={{
                    click: handleMarkerClick,
                }}
            >
                {/* Render the TrainPredictionPopup component when the popup is open */}
                {isPopupOpen && (
                    <TrainPredictionPopup 
                        id={id}
                        time={time}
                    />
                )}
            </Marker>
        </>
    );
}

export default TrainPrediction; // Export the TrainPrediction component
