// src/App.tsx
import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import './App.css';
import { PositionsEntry, RouteEntry } from './types';
import { Header, Footer } from './components';

const App: React.FC = () => {

  const [positions, setPositions] = useState<PositionsEntry[]>([]);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null);
  const [routes, setRoutes] = useState<RouteEntry[]>([]);
  const [selectedRoutes, setSelectedRoutes] = React.useState<string[]>([]);

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
  
  useEffect(() => {
        fetch('http://127.0.0.1:5000/routes')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setRoutes(data);
            })
            .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <Header lastUpdateTime={lastUpdateTime}/>
      <div className="app-main-container">
        <div className="app-map-container">
          <div className='map-container'>
            <Map 
              positions={positions}
              routes={routes}
              selectedRoutes={selectedRoutes}
              setSelectedRoutes={setSelectedRoutes} 
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
