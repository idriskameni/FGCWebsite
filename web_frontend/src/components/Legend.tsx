import React from 'react';
import trainIcon from '../assets/images/train-icon.png';
import predictionIcon from '../assets/images/prediction-icon.png';
import selectedIcon from '../assets/images/selected-icon.png';

interface LegendProps {
  // No props are passed to this component
}

const Legend: React.FC<LegendProps> = () => {
  return (
    <>
      {/* Legend item for "Posicions actuals" */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', // Center horizontally
        alignItems: 'center',    // Center vertically
        margin: '10px',
        borderRadius: '5px',
        padding: '5px',
        backgroundColor: '#f0f1ef'
      }}>
        <img src={trainIcon} alt="Prediction" style={{ width: '25px', height: 'auto', marginRight: '5px' }} />
        <span style={{ color: '#282c34' }}>Posicions actuals</span>
      </div>

      {/* Legend item for "Tren seleccionat per la predicció" */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', // Center horizontally
        alignItems: 'center',    // Center vertically
        margin: '10px',
        borderRadius: '5px',
        padding: '5px',
        backgroundColor: '#f0f1ef'
      }}>
        <img src={selectedIcon} alt="Prediction" style={{ width: '25px', height: 'auto', marginRight: '5px' }} />
        <span style={{ color: '#282c34' }}>Tren seleccionat per la predicció</span>
      </div>

      {/* Legend item for "Predicció del tren seleccionat" */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', // Center horizontally
        alignItems: 'center',    // Center vertically
        margin: '10px',
        borderRadius: '5px',
        padding: '5px',
        backgroundColor: '#f0f1ef'
      }}>
        <img src={predictionIcon} alt="Prediction" style={{ width: '25px', height: 'auto', marginRight: '5px' }} />
        <span style={{ color: '#282c34' }}>Predicció del tren seleccionat</span>
      </div>
    </>
  );
}

export default Legend;
