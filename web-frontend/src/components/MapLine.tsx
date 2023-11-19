import React from 'react';
import { Polyline } from 'react-leaflet';
import { RailwayLinesEntry } from '../types';
import polyline from '@mapbox/polyline';

interface MapLinesProps {
    railwayLine: RailwayLinesEntry;
}

const MapLine: React.FC<MapLinesProps> = ({ railwayLine }) => {

    const decodedPositions = polyline.decode(railwayLine.shape).map((point: [number, number]) => {
        return { lat: point[0], lng: point[1] };
    });

    return (
        <>
                <Polyline
                    key={railwayLine.route_id}
                    positions={PolyUtil.decode(railwayLine.shape)}
                    color={`#${railwayLine.route_color}`}
                />
        </>
    );
    
}

export default MapLine;