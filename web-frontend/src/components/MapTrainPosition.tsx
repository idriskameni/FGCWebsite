import React from 'react';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import trainIcon from '../assets/images/train-icon.png';

interface MapTrainPositionProps {
    latitude: number;
    longitude: number;
    id: string; // Add an ID for the train
    timestamp: number; // Add a timestamp for the last update
}

const trainMarkerIcon = L.icon({
    iconUrl: trainIcon,
    iconSize: [25, 25], // Size of the icon
    iconAnchor: [12, 12], // Center the icon over the location
    popupAnchor: [0, -12], // Point from which the popup should open relative to the iconAnchor
});

function epochToLocalTimeString(epoch: number) {
    const date = new Date(epoch);
    return date;
}

const MapTrainPosition: React.FC<MapTrainPositionProps> = ({ latitude, longitude, id, timestamp }) => {

    const formattedTime = epochToLocalTimeString(timestamp).toLocaleDateString() + ' ' + epochToLocalTimeString(timestamp).toLocaleTimeString();

    return (
        <>
            <Marker 
                key={id} 
                position={[latitude, longitude]} 
                icon={trainMarkerIcon}
            >
                <Popup>
                    Trip ID: {id} <br /> Last Updated: {formattedTime}
                </Popup>
            </Marker>
        </>
    );
}

export default MapTrainPosition;
