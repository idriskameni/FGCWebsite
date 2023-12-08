// Import necessary modules and components
import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import './App.css';
import { PositionsEntry, PredicitonEntry, RouteEntry } from './types';
import { Header, Footer } from './components';

// Define the main App component
const App: React.FC = () => {
  // State variables for positions, lastUpdateTime, routes, selectedRoutes, and prediction
  const [positions, setPositions] = useState<PositionsEntry[]>([]);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null);
  const [routes, setRoutes] = useState<RouteEntry[]>([]);
  const [selectedRoutes, setSelectedRoutes] = React.useState<string[]>([]);
  const [prediction, setPrediction] = useState<PredicitonEntry | null>(null);

  // Fetch positions data and update it at regular intervals
  useEffect(() => {
    // Set up a timer to fetch the data every 5 seconds
    const interval = setInterval(() => {
      fetch('http://127.0.0.1:5000/positions')
        .then((response) => response.json())
        .then((data) => {
          setPositions(data);
          setLastUpdateTime(new Date());
        })
        .catch((error) => console.error('Error fetching data:', error));
    }, 5000);

    // Don't forget to clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  // Fetch routes data
  useEffect(() => {
    fetch('http://127.0.0.1:5000/routes')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setRoutes(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Render the application layout
  return (
    <>
      {/* Render the header component with lastUpdateTime */}
      <Header lastUpdateTime={lastUpdateTime} />
      <div className="app-main-container">
        <div className="app-map-container">
          <div className='map-container'>
            {/* Render the Map component with necessary props */}
            <Map
              positions={positions}
              routes={routes}
              selectedRoutes={selectedRoutes}
              setSelectedRoutes={setSelectedRoutes}
              prediction={prediction}
              setPrediction={setPrediction}
            />
          </div>
        </div>
      </div>
      {/* Render the footer component */}
      <Footer />
    </>
  );
};

export default App; // Export the main App component
