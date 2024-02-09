"use client";

import React from 'react'
import { useNavBarContext } from '../contexts/NavBarContext';

function NavBarMobileLinks() {
  const { isToggled } = useNavBarContext();

  return (
    <>
      {isToggled && (
        <div className="text-white">
          <a className="block py-2 px-4 text-sm hover:bg-slate-700" href="/">Today</a>
          <a className="block py-2 px-4 text-sm hover:bg-slate-700" href="/next-business-day">Next Business Day</a>
          <a className="block py-2 px-4 text-sm hover:bg-slate-700" href="/holiday-orders">Holiday Orders</a>
        </div>
      )}
    </>
  )
}

export default NavBarMobileLinks