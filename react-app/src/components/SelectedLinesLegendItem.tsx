import React from 'react';
import { LinesData } from '../types';

interface LegendItemProps {
  line: LinesData;
}


const SelectedLinesLegendItem: React.FC<LegendItemProps> =  ({ line }) => {
    const boxStyle = {
      width: '20px',
      height: '20px',
      backgroundColor: `#${line.route_color}`,
      display: 'inline-block',
      marginRight: '10px',
    };
  
    return (
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
        <div style={boxStyle}></div>
        <div>{line.route_id}</div>
      </div>
    );
  };

export default SelectedLinesLegendItem;