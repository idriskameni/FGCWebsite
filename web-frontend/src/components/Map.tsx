// src/components/Map.tsx
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { PositionsEntry, PredicitonEntry, RouteEntry } from '../types';
import TrainPosition from './TrainPosition';
import MapLine from './MapLine';
import LineSelector from './LineSelector';
import TrainPrediction from './TrainPrediction';
import Legend from './Legend';

interface MapProps {
  positions: PositionsEntry[];
  routes: RouteEntry[];
  selectedRoutes: string[];
  setSelectedRoutes: React.Dispatch<React.SetStateAction<string[]>>;
  prediction: PredicitonEntry | null;
  setPrediction: React.Dispatch<React.SetStateAction<PredicitonEntry | null>>;
}

const Map: React.FC<MapProps> = ({ positions, routes, selectedRoutes, setSelectedRoutes, prediction, setPrediction }) => {

  // Filter positions based on selected routes
  const filteredPositions = positions.filter(position => 
    selectedRoutes.includes(position.lin)
  );

  // Filter routes the same way as before, but also ensure they are in the selected routes
  const filteredRoutes = routes.filter(route => 
    selectedRoutes.includes(route.route_id) && route.route_type === 'Rail'
  );

    
  return (
    <MapContainer center={[41.3879, 2.16992]} zoom={13} style={{ height: '100%', width: '100%' }}>

      {/* I want to render the following component in the top center of the map */}
      <div className='map-header'>
        <div className='map-header-elements'>
          <LineSelector 
              positions={positions}
              routes={routes}
              selectedRoutes={selectedRoutes}
              setSelectedRoutes={setSelectedRoutes} 
          />
        </div>
      </div>

      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
      />

      {/* Render train markers */}
      {filteredPositions?.map((position) => (
          <TrainPosition
            key={position.id}
            id={position.id}
            latitude={position.geo_point_2d.lat}
            longitude={position.geo_point_2d.lon}
            setPrediction={setPrediction}
          />
      ))}

      {/* Render train markers */}
        {filteredRoutes?.map((route) => (
          <MapLine
            key={route.route_id}
            coordinates={route.shape.geometry.coordinates[0]}
            color={route.route_color}
          />
      ))}

      {/* Render train prediction */}
      {prediction && (
        <TrainPrediction
          key={prediction.id}
          id={prediction.id}
          latitude={prediction.latitude}
          longitude={prediction.longitude}
        />
      )}

      {/* I want to render the following component in the bottom right corner of the map*/}
      <div className='map-footer'>
        <div className='map-footer-elements'>
          <Legend />
        </div>
      </div>

    </MapContainer>
  );

};

export default Map;
