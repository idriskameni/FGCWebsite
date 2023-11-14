// src/App.tsx
import React, { useState, useEffect } from 'react';
import Map from './components/Map';
// import StatusCard from './components/StatusCard';
import './App.css'; // Assuming you have your styling here
import { PositionsData, LinesData } from './types';
import { Header, LineSelector, SideBar } from './components';	// Import the Header component
import { SelectChangeEvent } from '@mui/material';

const App: React.FC = () => {
  const [railwayData, setRailwayData] = useState<LinesData[]>([]);
  const [positions, setPositions] = useState<PositionsData[]>([]);
  const [lineNames, setLineNames] = useState<string[]>([]);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null);

  useEffect(() => {
    // Define the function to fetch data
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/railway-lines');
        const data = await response.json();
        setRailwayData(data);

        const lineNames = data.map((line: LinesData) => line.route_id);
        setLineNames(lineNames);
      } catch (error) {
        console.error('Error fetching railway data:', error);
      }
    };

    // Call the function
    fetchData();
  }, []);

  useEffect(() => {
    // Set up a timer to fetch the data every 5 seconds
    const interval = setInterval(() => {
      fetch('http://127.0.0.1:5000/latest-positions')
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

  return (
    <>
      <Header lastUpdateTime={lastUpdateTime}/>
      <div className="app-container">
        {/* <SideBar /> */}
        <div className="app-map-container">
          <div className='map-container'>
            <Map 
              positions={positions} 
              railwayData={railwayData} 
              lineNames={lineNames} 
            />
          </div>
          <div className="line-selector-container">
            <LineSelector
              lineNames={lineNames}
              railwayData={railwayData}
              positionsData={positions}
            />
          </div>
        </div>
        {/* <StatusCard positions={positions} /> */}
      </div>
    </>
  );
};

export default App;
