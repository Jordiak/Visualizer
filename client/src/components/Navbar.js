import React,{ useState, useEffect, useContext } from 'react';

import { Link } from 'react-router-dom';
import './Navbar.css';
import logoImage from './images/newL.png';
import ReactSession from 'react-client-session/dist/ReactSession';
import { UserContext } from './UserContext';
import discboardpic from './images/discboard.png';

// navbar for the entire website
function Navbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const [userName, setUserName] = useState('Login/Registerx');

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  console.log(userName)
  const {value,setValue} = useContext(UserContext);

  return (
    <>
      <nav className='navbar'>
      <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
      <img draggable="false" src={logoImage} alt='DSA' width={154} height={61} />
      </Link>
        
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/login-form' className='nav-links' onClick={closeMobileMenu}>
            {value}
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/information' className='nav-links' onClick={() => { closeMobileMenu();}}>
              Introduction
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/sorting-algorithms' className='nav-links' onClick={closeMobileMenu}>
              Sorting
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/shortest-path-algorithms' className='nav-links' onClick={closeMobileMenu}>
              Path Finding
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/data-structures' className='nav-links' onClick={closeMobileMenu}>
              Data Structures
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/quiz' className='nav-links' onClick={closeMobileMenu}>
            Quiz
            </Link>
          </li>
         
          
        </ul>
        <li className='nav-item-disc'>
            <Link to='/comments' className='nav-links' onClick={closeMobileMenu}>
            Discussion Board
            </Link>
          </li>
      </nav>
    </>
  );
}

export default Navbar;