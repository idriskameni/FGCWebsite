import React, { useState } from 'react';
import L from 'leaflet';
import { Marker } from 'react-leaflet';
import trainIcon from '../assets/images/train-icon.png';
import selectedIcon from '../assets/images/selected-icon.png';
import TrainPositionPopup from './TrainPositionPopup';

interface TrainPositionProps {
    latitude: number;
    longitude: number;
    id: string;
    lin: string;
    handleClose: (id: string | null, lin: string | null, sliderValue: number | null) => void;
    latestPressedId: string | null;
    loading: boolean;
    predictionId: string | null;
    predictionSliderValue: number | null;
    predictionLin: string | null;
}

const TrainPosition: React.FC<TrainPositionProps> = ({ latitude, longitude, id, lin, handleClose, latestPressedId, loading }) => {

    const [sliderValue, setSliderValue] = useState<number>(30);
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(true);

    const trainMarkerIcon = L.icon({
        iconUrl: latestPressedId === id ? selectedIcon : trainIcon,
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
                        isPopupOpen={isPopupOpen}
                        setIsPopupOpen={setIsPopupOpen}
                        loading={loading}
                        predictionId={id}
                        predictionLin={lin}
                        predictionSliderValue={sliderValue}
                    />
                )}
            </Marker>
        </>
    );
}

export default TrainPosition;
