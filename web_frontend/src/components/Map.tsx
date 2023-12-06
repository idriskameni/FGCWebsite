// src/components/Map.tsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { AlertColor } from '@mui/material/Alert';

import { PositionsEntry, PredicitonEntry, RouteEntry } from '../types';
import TrainPosition from './TrainPosition';
import MapLine from './MapLine';
import LineSelector from './LineSelector';
import TrainPrediction from './TrainPrediction';
import Legend from './Legend';
import ModelAlert from './ModelAlert';

interface MapProps {
  positions: PositionsEntry[];
  routes: RouteEntry[];
  selectedRoutes: string[];
  setSelectedRoutes: React.Dispatch<React.SetStateAction<string[]>>;
  prediction: PredicitonEntry | null;
  setPrediction: React.Dispatch<React.SetStateAction<PredicitonEntry | null>>;
}

const Map: React.FC<MapProps> = ({ 
  positions, routes, selectedRoutes, setSelectedRoutes, prediction, setPrediction
}) => {

  const [latestPressedId, setLatestPressedId] = useState<string | null>(null); // Add state for latest pressed ID
  const [loading, setLoading] = useState<boolean>(false);
  const [predictionLin, setPredictionLin] = useState<string | null>(null);
  const [predictionDir, setPredictionDir] = useState<string | null>(null);
  const [predictionOnTime, setPredictionOnTime] = useState<string | null>(null);
  const [predictionId, setPredictionId] = useState<string | null>(null);
  const [predictionSliderValue, setPredictionSliderValue] = useState<number | null>(null);
  const [severity, setSeverity] = useState<AlertColor | undefined>(undefined);

  // Filter positions based on selected routes
  const filteredPositions = positions.filter(position => 
    selectedRoutes.includes(position.lin)
  );

  // Filter routes the same way as before, but also ensure they are in the selected routes
  const filteredRoutes = routes.filter(route => 
    selectedRoutes.includes(route.route_id) && route.route_type === 'Rail'
  );

  const handleClose = (lin: string | null, dir: string | null, onTime: string | null, id: string | null, sliderValue: number | null) => {

    setLatestPressedId(id);
    setPredictionLin(lin);
    setPredictionDir(null);
    setPredictionOnTime(null);
    setPredictionId(id);
    setPredictionSliderValue(sliderValue);
    setLoading(true);
    setPrediction(null);
    
    // Make the API call directly here
    fetch(`http://127.0.0.1:5000/predictions/${lin}/${dir}/${onTime}/${id}/${sliderValue}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setPrediction(data);
        })
        .catch((error) => { 
          console.error('Error fetching data:', error);
          setSeverity('error');
        })
        .finally(() => {
            // Re-enable the "SOTMET" button after the API call is completed
            setLoading(false);
            setSeverity('success');
            
        });

  };

  useEffect(() => {
    if (loading) {
      // Loading is true, show loading message
      setSeverity('info');
    } else if (severity === 'success') {
      // Loading is false, show success message for 3 seconds
      const successTimeout = setTimeout(() => {
        setSeverity(undefined); // Reset to no message after 3 seconds
      }, 5000);
      
      // Cleanup the timeout when component unmounts or loading changes
      return () => clearTimeout(successTimeout);
    } else if (severity === 'error') {
      // Loading is false, show success message for 3 seconds
      const successTimeout = setTimeout(() => {
        setSeverity(undefined); // Reset to no message after 3 seconds
      }, 5000);
      
      // Cleanup the timeout when component unmounts or loading changes
      return () => clearTimeout(successTimeout);
    }
  }, [loading, severity]);

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
        <ModelAlert loading={loading} severity={severity} />
      </div>

      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
      />

      {/* Render train markers */}
      {filteredPositions?.map((position) => (
          <TrainPosition
            key={position.id}
            lin={position.lin}
            dir={position.dir}
            onTime={position.en_hora}
            id={position.id}
            latitude={position.geo_point_2d.lat}
            longitude={position.geo_point_2d.lon}
            latestPressedId={latestPressedId}
            loading={loading}
            handleClose={handleClose}
            predictionLin={predictionLin}
            predictionDir={predictionDir}
            predictionOnTime={predictionOnTime}
            predictionId={predictionId}
            predictionSliderValue={predictionSliderValue}
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
          time={prediction.time}
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
