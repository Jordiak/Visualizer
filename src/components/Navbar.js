import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logoImage from './images/bitLogo.png';


function Navbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

 

  return (
    <>
      <nav className='navbar'>
      <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
      <img src={logoImage} alt='' width={198} height={97} />
      </Link>
        
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/home' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/information' className='nav-links' onClick={closeMobileMenu}>
              Introduction
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/sorting-algorithms' className='nav-links' onClick={closeMobileMenu}>
              Sorting Algorithms
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/shortest-path-algorithms' className='nav-links' onClick={closeMobileMenu}>
              Shortest Path Algorithms
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/data-structures' className='nav-links' onClick={closeMobileMenu}>
              Data Structures
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;