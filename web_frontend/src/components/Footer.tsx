import React from 'react';

// Define the props interface for Footer (empty in this case)
interface FooterProps {	
}

// Define the Footer functional component
const Footer: React.FC<FooterProps> = () => {

  return (
    <>
        {/* Define the footer structure */}
        <div className='app-footer'>
            <div className='app-footer__text'>
              <h3>Adrián Alonso Gonzalo - Màster Universitari en Ciència de Dades (UOC)</h3>
            </div>
        </div>
    </>
  );
}

export default Footer; // Export the Footer component
