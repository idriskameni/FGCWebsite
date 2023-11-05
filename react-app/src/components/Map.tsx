// src/components/Map.tsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import trainIcon from '../assets/images/train-icon.png'; // Make sure this path is correct
import { Position } from '../types';

interface MapProps {
  positions: Position[];
}

const trainMarkerIcon = L.icon({
  iconUrl: trainIcon,
  iconSize: [25, 25], // Size of the icon
  iconAnchor: [20, 20], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -25], // Point from which the popup should open relative to the iconAnchor
});

const Map: React.FC<MapProps> = ({ positions }) => {
  return (
    <MapContainer center={[41.3879, 2.16992]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {positions.map((position) => (
        <Marker 
          key={position.id} 
          position={[position.lat, position.lon]} 
          icon={trainMarkerIcon}
        >
          <Popup>
            Train ID: {position.id} <br /> Last Updated: {position.timestamp}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
