import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import { Popup } from 'react-leaflet';

interface TrainPositionPopupProps {
    id: string;
    sliderValue: number;
    handleSliderChange: (
        event: Event,
        newValue: number | number[],
        activeThumb?: number
    ) => void;
    handleClose: (
        id: string | null,
        lin: string | null,
        sliderValue: number | null
    ) => void;
    isPopupOpen: boolean;
    setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
    loading: boolean;
    predictionId: string | null;
    predictionSliderValue: number | null;
    predictionLin: string | null;
}

const TrainPositionPopup: React.FC<TrainPositionPopupProps> = ({
    id,
    sliderValue,
    handleSliderChange,
    handleClose,
    isPopupOpen,
    setIsPopupOpen,
    loading,
    predictionId,
    predictionLin,
    predictionSliderValue
}) => {

  const handleSOTMETClick = () => {
    if (!loading) {
      handleClose(predictionId, predictionLin, predictionSliderValue);
      closePopup();
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      {isPopupOpen && !loading ? (
        <Popup>
          <div style={{ padding: '20px' }}>
            <h2>Fes una predicció sobre aquest tren</h2>
            <p>
              Selecciona el temps per predir la seva posició futura a la línia.
              Per exemple, si vols veure la seva posició en 15 minuts, selecciona 15
              minuts.
            </p>
          </div>
          <Box sx={{ width: 300 }}>
            <Slider
              defaultValue={50}
              value={sliderValue}
              onChange={handleSliderChange}
              aria-label="Default"
              valueLabelDisplay="auto"
              min={0}
              max={60}
              step={5}
              marks={[{ value: 30, label: 'minuts' }]}
              sx={{
                color: '#282c34',
                '& .MuiSlider-thumb': {
                  color: '#282c34'
                },
                '& .MuiSlider-track': {
                  color: '#282c34'
                },
                '& .MuiSlider-rail': {
                  color: 'grey.400'
                }
              }}
            />
            <div style={{ padding: '20px' }}>
              <h3>Els valors seleccionats són:</h3>
              <p>Trip ID:<br />{id}</p>
              <p>Minuts:<br />{sliderValue} mins</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <Button onClick={handleSOTMETClick}>
                {'SOTMET'}
              </Button>
            </div>
          </Box>
        </Popup>
      ) : 
      (
        <Popup>
            <div style={{ padding: '20px' }}>
              <h2>Espera uns segons...</h2>
              <p>Estem fent la predicció sobre el tren seleccionat.</p>
            </div>
        </Popup>
        )}
    </>
  );
};

export default TrainPositionPopup;