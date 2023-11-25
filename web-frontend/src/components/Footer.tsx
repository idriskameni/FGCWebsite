import React from 'react';

interface FooterProps {	
}

const Footer: React.FC<FooterProps> = () => {

  return (
    <>
        <div className='app-footer'>
            <div className='app-footer__text'>
              <h3>Adrián Alonso Gonzalo - Màster Universitari en Ciència de Dades (UOC)</h3>
            </div>
        </div>
    </>
  );
}

export default Footer;
