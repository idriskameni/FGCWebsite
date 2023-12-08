import React from 'react';
import Button from '@mui/material/Button';

// Define the props interface for AppButton
interface AppButtonProps {
    children: React.ReactNode; // React node for the button label
    handleClickOpen: () => void; // Function to handle button click
}

// Define the AppButton functional component
const AppButton: React.FC<AppButtonProps> = ({ children, handleClickOpen }) => {

    return (
        <>
            {/* Create a Material UI Button */}
            <Button 
                onClick={handleClickOpen} // Set the click event handler
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
                {children} {/* Display the button label */}
            </Button>
        </>
    );

}

export default AppButton; // Export the AppButton component
