import React from 'react';
import { Polyline } from 'react-leaflet';
import { RailwayLinesEntry } from '../types';

interface MapLinesProps {
    railwayLine: RailwayLinesEntry;
}

const MapLineStop: React.FC<MapLinesProps> = ({ railwayLine }) => {
    return (
        <>
            <Polyline
                key={railwayLine.route_id}
                positions={railwayLine.coordinates.map(coord => [coord[1], coord[0]])}
                color={`#${railwayLine.route_color}`}
            />
        </>
    );
}

export default MapLineStop;