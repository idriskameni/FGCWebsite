import React, { useState } from 'react';
import L from 'leaflet';
import { Marker } from 'react-leaflet';
import predictionIcon from '../assets/images/prediction-icon.png';
import TrainPredictionPopup from './TrainPredictionPopup';

interface TrainPredictionProps {
    latitude: number;
    longitude: number;
    id: string;
    time: string;
}

const TrainPrediction: React.FC<TrainPredictionProps> = ({ latitude, longitude, id, time }) => {

    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(true);


    const trainMarkerIcon = L.icon({
        iconUrl: predictionIcon,
        iconSize: [25, 25], // Size of the icon
        iconAnchor: [12, 12], // Center the icon over the location
        popupAnchor: [0, -12], // Point from which the popup should open relative to the iconAnchor
    });

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

export default TrainPrediction;
