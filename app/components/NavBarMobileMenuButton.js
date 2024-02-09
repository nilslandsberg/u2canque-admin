"use client";

import React from 'react';
import { useNavBarContext } from '../contexts/NavBarContext';



function NavBarMobileMenuButton() {
  const { isToggled, setIsToggled } = useNavBarContext();

  const toggleMenu = () => {
    if (isToggled === false) {
      setIsToggled(true);
    } else {
      setIsToggled(false);
    }
  }

  return (
    <div className="mobile-menu-button md:hidden flex items-center">
      <button onClick={toggleMenu}>
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
    </div>
  )
}

export default NavBarMobileMenuButton