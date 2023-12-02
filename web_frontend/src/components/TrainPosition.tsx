import React, { useState } from 'react';
import L from 'leaflet';
import { Marker } from 'react-leaflet';
import trainIcon from '../assets/images/train-icon.png';
import TrainPositionPopup from './TrainPositionPopup';
import { PredicitonEntry } from '../types';

interface TrainPositionProps {
    latitude: number;
    longitude: number;
    id: string; // Add an ID for the train
    setPrediction: React.Dispatch<React.SetStateAction<PredicitonEntry | null>>;
}

const TrainPosition: React.FC<TrainPositionProps> = ({ latitude, longitude, id, setPrediction }) => {

    const [sliderValue, setSliderValue] = useState<number>(30);
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(true);

    const trainMarkerIcon = L.icon({
        iconUrl: trainIcon,
        iconSize: [25, 25], // Size of the icon
        iconAnchor: [12, 12], // Center the icon over the location
        popupAnchor: [0, -12], // Point from which the popup should open relative to the iconAnchor
    });

    const handleSliderChange = (
        event: Event, 
        newValue: number | number[],
        activeThumb?: number
    ) => {
        if (typeof newValue === 'number') {
            setSliderValue(newValue);
        }
    };

    const handleClose = () => {
        setIsPopupOpen(false);
        
        // Make the API call directly here
        fetch(`http://127.0.0.1:5000/predictions/${id}/${sliderValue}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setPrediction(data);
            })
            .catch((error) => console.error('Error fetching data:', error));
    };

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
                    <TrainPositionPopup 
                        id={id}
                        sliderValue={sliderValue}
                        handleSliderChange={handleSliderChange}
                        handleClose={handleClose}
                    />
                )}
            </Marker>
        </>
    );
}

export default TrainPosition;
