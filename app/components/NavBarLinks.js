import React from 'react'

function NavBarLinks() {
  
  return (
    <>
      <div className="items-center space-x-5 justify-between md:flex hidden">
        <a className=" hover:text-gray-400" href="/">Today</a>
        <a className=" hover:text-gray-400" href="/next-business-day">Next Business Day</a>
        <a className="hover:text-gray-400" href="/order/cart">Holiday Orders</a>
      </div>
    </>
  )
}

export default NavBarLinks