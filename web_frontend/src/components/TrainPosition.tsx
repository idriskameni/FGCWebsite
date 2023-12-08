import React, { useState } from 'react';
import L from 'leaflet';
import { Marker } from 'react-leaflet';
import trainIcon from '../assets/images/train-icon.png';
import selectedIcon from '../assets/images/selected-icon.png';
import TrainPositionPopup from './TrainPositionPopup';

// Define the props interface for TrainPosition
interface TrainPositionProps {
    latitude: number;
    longitude: number;
    lin: string;
    dir: string;
    onTime: string;
    id: string;
    handleClose: (lin: string | null, dir: string | null, onTime: string | null, id: string | null, sliderValue: number | null) => void;
    latestPressedId: string | null;
    loading: boolean;
    predictionLin: string | null;
    predictionDir: string | null;
    predictionOnTime: string | null;
    predictionId: string | null;
    predictionSliderValue: number | null;
}

// Define the TrainPosition functional component
const TrainPosition: React.FC<TrainPositionProps> = ({ latitude, longitude, lin, dir, onTime, id, handleClose, latestPressedId, loading }) => {

    // State to manage the slider value for prediction time
    const [sliderValue, setSliderValue] = useState<number>(30);

    // State to manage whether the popup is open
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(true);

    // Create a custom train marker icon based on the latestPressedId
    const trainMarkerIcon = L.icon({
        iconUrl: latestPressedId === id ? selectedIcon : trainIcon,
        iconSize: [25, 25], // Size of the icon
        iconAnchor: [12, 12], // Center the icon over the location
        popupAnchor: [0, -12], // Point from which the popup should open relative to the iconAnchor
    });

    // Function to handle slider value change
    const handleSliderChange = (
        event: Event, 
        newValue: number | number[],
        activeThumb?: number
    ) => {
        if (typeof newValue === 'number') {
            setSliderValue(newValue);
        }
    };

    // Function to handle marker click and open the popup
    const handleMarkerClick = () => {
        setIsPopupOpen(true); // Show the Popup
    };

    return (
        <>
            {/* Render the train marker on the map */}
            <Marker 
                key={id} 
                position={[latitude, longitude]} 
                icon={trainMarkerIcon}
                eventHandlers={{
                    click: handleMarkerClick,
                }}
            >
                {/* Render the TrainPositionPopup when the popup is open */}
                {isPopupOpen && (
                    <TrainPositionPopup 
                        id={id}
                        sliderValue={sliderValue}
                        handleSliderChange={handleSliderChange}
                        handleClose={handleClose}
                        isPopupOpen={isPopupOpen}
                        setIsPopupOpen={setIsPopupOpen}
                        loading={loading}
                        predictionLin={lin}
                        predictionDir={dir}
                        predictionOnTime={onTime}
                        predictionId={id}
                        predictionSliderValue={sliderValue}
                    />
                )}
            </Marker>
        </>
    );
}

export default TrainPosition; // Export the TrainPosition component
