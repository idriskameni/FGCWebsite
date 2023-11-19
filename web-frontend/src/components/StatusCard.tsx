import React from 'react';
import { LatestPositionsEntry } from '../types';

interface StatusCardProps {
  latestPositions: LatestPositionsEntry[];
}

const StatusCard: React.FC<StatusCardProps> = ({ latestPositions }) => {
  return (
    <div className="status-card">
      {latestPositions.map((position) => (
        <div key={position.id} className="status-item">
          <p>Train ID: {position.id}</p>
          <p>Last Updated: {position.timestamp}</p>
        </div>
      ))}
    </div>
  );
};

export default StatusCard;
