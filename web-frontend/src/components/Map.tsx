// src/components/Map.tsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import trainIcon from '../assets/images/train-icon.png'; // Make sure this path is correct
import { LatestPositionsEntry, RailwayLinesEntry } from '../types';
import MapLine from './MapLine';

interface MapProps {
  latestPositions: LatestPositionsEntry[];
  railwayLines: RailwayLinesEntry[];
}

const trainMarkerIcon = L.icon({
  iconUrl: trainIcon,
  iconSize: [25, 25], // Size of the icon
  iconAnchor: [20, 20], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -25], // Point from which the popup should open relative to the iconAnchor
});

const Map: React.FC<MapProps> = ({ latestPositions, railwayLines }) => {
  
  return (
    <MapContainer center={[41.3879, 2.16992]} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
      />

      {/* Render railway lines */}
      {railwayLines?.map((railwayLine) => (
        <MapLine key={railwayLine.route_id} railwayLine={railwayLine} />
      ))}

      {/* Render train markers */}
      {
      /**
      {latestPositions?.map((position) => (
        <Marker 
          key={position.id} 
          position={[position.geo_point_2d.lat, position.geo_point_2d.lon]} 
          icon={trainMarkerIcon}
        >
          <Popup>
            Train ID: {position.id} <br /> Last Updated: {position.timestamp}
          </Popup>
        </Marker>
      ))}
      */
      }
    </MapContainer>
  );

};

export default Map;
