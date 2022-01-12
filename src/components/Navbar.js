import React, { useState } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Dropdown from './Dropdown';
import logoImage from './images/DSALOGO.png';


function Navbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <>
      <nav className='navbar'>
     
      <img src={logoImage} alt='' width={100} height={80}/>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          isualizer
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
          <li
            className='nav-item'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link
              to='/data-structures'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Data Structures <i className='fas fa-caret-down' />
            </Link>
            {dropdown && <Dropdown />}
          </li>
          <li className='nav-item'>
            <Link to='/sorting-algorithms' className='nav-links' onClick={closeMobileMenu}>
              Sorting Algorithms
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/searching-algorithms' className='nav-links' onClick={closeMobileMenu}>
              Searching Algorithms
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;