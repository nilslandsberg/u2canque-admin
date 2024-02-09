import Image from 'next/image'
import React from 'react'
import NavBarLinks from './NavBarLinks'
// import NavBarLinks from './NavBarLinks'
// import NavBarMobileLinks from './NavBarMobileLinks'
// import NavBarMobileMenuButton from './NavBarMobileMenuButton'


const NavBar = () => {
  return (
    <div className="navbar-container absolute">
      <nav className={"bg-slate-600 dark:bg-gray-900 fixed w-full z-40 top-0 left-0 border-b border-gray-200 dark:border-gray-600"}>
        <div className="max-w-7xl mx-auto py-3 px-2 text-white">
          <div className="flex items-center justify-between">
          <div className="relative flex flex-col justify-start">
          <div className="relative flex flex-row z-30 p-5 text-2xl  
            text-white text-center items-center">
            <Image src='/images/U2CanQueLogo.svg' alt="logo" width={75} height={75} className="pb-2 mr-2" />
            Order Management
          </div>
        </div>
            <NavBarLinks />
            {/* <NavBarMobileMenuButton />  */}
          </div>
        </div>
        {/* <NavBarMobileLinks /> */}
      </nav>
    </div>
  )
}

export default NavBar