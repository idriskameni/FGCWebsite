// src/components/Map.tsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import trainIcon from '../assets/images/train-icon.png'; // Make sure this path is correct
import { PositionsData, LinesData } from '../types';

interface MapProps {
  positions: PositionsData[];
  railwayData: LinesData[];
  lineNames: string[];
}

const trainMarkerIcon = L.icon({
  iconUrl: trainIcon,
  iconSize: [25, 25], // Size of the icon
  iconAnchor: [20, 20], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -25], // Point from which the popup should open relative to the iconAnchor
});

const Map: React.FC<MapProps> = ({ positions, railwayData, lineNames }) => {

  // Filter railway lines based on selected route IDs
  const filteredRailwayData = railwayData.filter(line => lineNames.includes(line.route_id));
  
  return (
    <MapContainer center={[41.3879, 2.16992]} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
      />

      {filteredRailwayData?.map((line, index) => (
        <Polyline
          key={index}
          positions={line.coordinates.map(coord => [coord[1], coord[0]])}
          color={`#${line.route_color}`}
        />
      ))}

      {positions?.map((position) => (
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
