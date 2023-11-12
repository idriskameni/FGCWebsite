// LegendCard component
import * as React from 'react';
import { LinesData } from '../types';
import SelectedLinesLegendItem from './SelectedLinesLegendItem';

interface SelectedLinesLegendCardProps {
  railwayData: LinesData[];
  lineNames: string[];
}

const SelectedLinesLegendCard: React.FC<SelectedLinesLegendCardProps> = ({ railwayData, lineNames }) => {

  // Filter railway lines based on selected route IDs
  const filteredRailwayData = railwayData.filter(line => lineNames.includes(line.route_id));

  return (
    <div style={{ padding: '10px', border: '1px solid black', borderRadius: '5px' }}>
      {filteredRailwayData.map((line, index) => (
        <SelectedLinesLegendItem key={index} line={line} />
      ))}
    </div>
  );

};

export default SelectedLinesLegendCard;