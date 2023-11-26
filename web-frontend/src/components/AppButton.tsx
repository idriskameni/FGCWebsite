import React from 'react';
import Button from '@mui/material/Button';


interface AppButtonProps {
    children: React.ReactNode;
    handleClickOpen: () => void;
}

const AppButton: React.FC<AppButtonProps> = ({ children, handleClickOpen }) => {

    return (
        <>
            <Button 
                onClick={handleClickOpen}   
                sx={{ 
                    m: 1, 
                    width: 300, 
                    height: 20, 
                    fontSize: '12px',
                    color: 'white',
                    zIndex: 100,
                    borderRadius: '4px',
                    }}
            >
                {children}
            </Button>
        </>
    );

}

export default AppButton;