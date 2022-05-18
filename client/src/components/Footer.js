import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logoImage from './images/backendlogo.png';


function Navbar() {
  return (
    <>
      <div className='footer'>
      <img src={logoImage} alt='' width={100} height={28} />
      <p>© 2022 DSA. Some Rights Reserved.</p>
      </div>
    </>
  );
}

export default Navbar;