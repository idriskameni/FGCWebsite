// src/App.tsx
import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import StatusCard from './components/StatusCard';
import './App.css'; // Assuming you have your styling here
import { PositionsData, LinesData } from './types';
import { Header, LineSelector, SideBar } from './components';	// Import the Header component
import { SelectChangeEvent } from '@mui/material';

const App: React.FC = () => {
  const [railwayData, setRailwayData] = useState<LinesData[]>([]);
  const [positions, setPositions] = useState<PositionsData[]>([]);
  const [lineName, setLineName] = React.useState<string[]>([]);

  useEffect(() => {
    // Set up a timer to fetch the data every 5 seconds
    const interval = setInterval(() => {
      fetch('http://127.0.0.1:5000/latest-positions')
        .then((response) => response.json())
        .then((data) => setPositions(data))
        .catch((error) => console.error('Error fetching data:', error));
    }, 5000);

    // Don't forget to clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Define the function to fetch data
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/railway-lines');
        const data = await response.json();
        setRailwayData(data);
      } catch (error) {
        console.error('Error fetching railway data:', error);
      }
    };

    // Call the function
    fetchData();
  }, []);

  const handleChange = (event: SelectChangeEvent<typeof lineName>) => {
    const {
      target: { value },
    } = event;
    setLineName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <>
      <Header />
      <div className="app-container">
        <SideBar />
        <div className="app-map-container">
          <Map positions={positions} railwayData={railwayData} />
          <div className="line-selector-container">
            <LineSelector handleChange={handleChange} lineName={lineName} railwayData={railwayData} />
          </div>
        </div>
        {/* <StatusCard positions={positions} /> */}
      </div>
    </>
  );
};

export default App;
