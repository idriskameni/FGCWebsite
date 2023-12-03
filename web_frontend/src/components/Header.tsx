import React from 'react';

interface HeaderProps {	
  lastUpdateTime: Date | null;
}

const Header: React.FC<HeaderProps> = ({ lastUpdateTime }) => {

  const formattedTime = lastUpdateTime ? lastUpdateTime.toLocaleDateString() + ' ' + lastUpdateTime.toLocaleTimeString() : 'Encara no hi ha dades';

  return (
    <>
        <div className='app-header'>
            <div className='app-header__logo'>
                <header>
                    <h1>FGC Website</h1>
                </header>
            </div>
            <div className='app-header__last-update'>
              <h3>Última actualització: {formattedTime}</h3>
            </div>
        </div>
    </>
  );
}

export default Header;
