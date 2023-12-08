import React from 'react';

// Define the props interface for Header
interface HeaderProps {	
  lastUpdateTime: Date | null; // Prop to receive the last update time
}

// Define the Header functional component
const Header: React.FC<HeaderProps> = ({ lastUpdateTime }) => {

  // Format the last update time or display a message if it's null
  const formattedTime = lastUpdateTime ? lastUpdateTime.toLocaleDateString() + ' ' + lastUpdateTime.toLocaleTimeString() : 'Encara no hi ha dades';

  return (
    <>
        {/* Define the header structure */}
        <div className='app-header'>
            <div className='app-header__logo'>
                <header>
                    <h1>FGC Website</h1>
                </header>
            </div>
            <div className='app-header__last-update'>
              {/* Display the last update time */}
              <h3>Última actualització: {formattedTime}</h3>
            </div>
        </div>
    </>
  );
}

export default Header; // Export the Header component
