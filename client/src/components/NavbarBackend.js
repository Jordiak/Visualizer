import React,{ useState, useEffect, useContext } from 'react';

import { Link } from 'react-router-dom';
import './NavbarBackend.css';
import logoImage from './images/backendlogo.png';
import { UserContext } from './UserContext';

// navbar for backend
function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <nav className='navbarb'>
      <Link to='/admin' className='navbar-logo' onClick={closeMobileMenu}>
      <img src={logoImage} alt='' width={168} height={82} />
      </Link>
        
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/manage-users' className='navb-links' onClick={() => { closeMobileMenu();}}>
              Manage Users
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/manage-discussion' className='navb-links' onClick={closeMobileMenu}>
              Manage Discussion
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;