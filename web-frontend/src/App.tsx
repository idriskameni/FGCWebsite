// src/App.tsx
import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import './App.css';
import { LatestPositionsEntry, RailwayLinesEntry } from './types';
import { Header } from './components';

const App: React.FC = () => {
  const [railwayLines, setRailwayLines] = useState<RailwayLinesEntry[]>([]);
  const [latestPositions, setLatestPositions] = useState<LatestPositionsEntry[]>([]);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null);

  useEffect(() => {
    // Define the function to fetch data
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/railway-lines');
        const data = await response.json();
        setRailwayLines(data);
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
          setLatestPositions(data);
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
              latestPositions={latestPositions} 
              railwayLines={railwayLines}
            />
          </div>
          { /**
          <div className="line-selector-container">
            <LineSelector
              lineNames={lineNames}
              railwayData={railwayData}
              latestPositions={positions}
            />
          </div> 
          */ }
        </div>
        {/* <StatusCard positions={positions} /> */}
      </div>
    </>
  );
};

export default App;
