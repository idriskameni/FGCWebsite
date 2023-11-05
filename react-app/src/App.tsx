// src/App.tsx
import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import StatusCard from './components/StatusCard';
import './App.css'; // Assuming you have your styling here
import { Position } from './types';

const App: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);

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

  return (
    <div className="app-container">
      <Map positions={positions} />
      <StatusCard positions={positions} />
    </div>
  );
};

export default App;
