import React,{ useState, useEffect, useContext } from 'react';

import { Link } from 'react-router-dom';
import './NavbarBackend.css';
import logoImage from './images/backendlogo.png';
import { UserContext } from './UserContext';
import { BiUser, BiCommentDetail, BiEdit, BiLogOut, BiLineChart} from "react-icons/bi";

// navbar for backend
function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const adminLogout = () => {
    localStorage.removeItem("adminusername")
  }

  return (
    <>
      <nav className='navbarb'>
      <Link to='/dashboard' className='navbar-logo' onClick={closeMobileMenu}>
      <img draggable="false" src={logoImage} alt='DSA' width={168} height={45} />
      </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fab-times' : 'fas fab-bars'} />
        </div>
        <ul className={click ? 'navb-menu active' : 'navb-menu'}>
        <li className='navb-item'>
            <Link to='/dashboard' className='navb-links' onClick={closeMobileMenu}>
            <span className="navbicon"><BiLineChart/></span> Dashboard
            </Link>
          </li>
          <li className='navb-item'>
            <Link to='/manage-users' className='navb-links' onClick={() => { closeMobileMenu();}}>
              <span className="navbicon"><BiUser/></span> Users
            </Link>
          </li>
          <li className='navb-item'>
            <Link to='/manage-discussion' className='navb-links' onClick={closeMobileMenu}>
            <span className="navbicon"><BiCommentDetail/></span> Discussion
            </Link>
          </li>
          <li className='navb-item'>
            <Link to='/manage-quiz' className='navb-links' onClick={closeMobileMenu}>
            <span className="navbicon"><BiEdit/></span> Quiz
            </Link>
          </li>
          <li className='navb-item'>
          <a href="/admin" className="navb-links" onClick={adminLogout}>
          <span className="navbicon"><BiLogOut/></span> Log-out
            </a>
          </li>
          
        </ul>
      </nav>
    </>
  );
}

export default Navbar;