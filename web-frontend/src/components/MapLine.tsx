import React from 'react';
import { Polyline } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';


interface MapLineProps {
    coordinates: number[][];
    color: string;
}

const MapLine: React.FC<MapLineProps> = ({ coordinates, color }) => {

    const polylineCoordinates: LatLngTuple[] = coordinates.map(([lon, lat]) => [lat, lon] as LatLngTuple);

    return (
        <>
            <Polyline positions={polylineCoordinates} pathOptions={{ color: `#${color}`}} />
        </>
    );

}

export default MapLine;
