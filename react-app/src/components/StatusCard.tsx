import React from 'react';
import { PositionsData } from '../types';

interface StatusCardProps {
  positions: PositionsData[];
}

const StatusCard: React.FC<StatusCardProps> = ({ positions }) => {
  return (
    <div className="status-card">
      {positions.map((position) => (
        <div key={position.id} className="status-item">
          <p>Train ID: {position.id}</p>
          <p>Last Updated: {position.timestamp}</p>
        </div>
      ))}
    </div>
  );
};

export default StatusCard;