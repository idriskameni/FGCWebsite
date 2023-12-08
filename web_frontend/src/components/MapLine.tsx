import React from 'react';
import { Polyline } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';

// Define the props interface for MapLine
interface MapLineProps {
    coordinates: number[][]; // Array of coordinate pairs
    color: string; // Color of the polyline
}

// Define the MapLine functional component
const MapLine: React.FC<MapLineProps> = ({ coordinates, color }) => {

    // Convert the coordinates to LatLngTuple
    const polylineCoordinates: LatLngTuple[] = coordinates.map(([lon, lat]) => [lat, lon] as LatLngTuple);

    return (
        <>
            {/* Create a Polyline with the specified coordinates and color */}
            <Polyline positions={polylineCoordinates} pathOptions={{ color: `#${color}` }} />
        </>
    );

}

export default MapLine; // Export the MapLine component
