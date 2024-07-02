  "use client";

  import React from 'react'
  import { IoIosArrowDown } from "react-icons/io";

function NavBarLinks() {
  
    return (
      <>
        <div className="items-center space-x-5 justify-between md:flex hidden transition-all">
          <a className=" hover:text-gray-400" href="/">Today</a>
          <a className=" hover:text-gray-400" href="/next-business-day">Next Business Day</a>
          <a className=" hover:text-gray-400" href="/next-week">Next Week</a>
          <div className="relative group  px-2 py-3 transition-all">
            <div className="flex cursor-pointer items-center gap-2  group-hover:text-gray-400">
              <span>Holiday Orders</span>
              <IoIosArrowDown className="rotate-180 transition-all group-hover:rotate-0" />
            </div>
            <div className="absolute right-0 top-10 hidden w-auto flex-col gap-1 rounded-lg bg-white py-3 shadow-md transition-all group-hover:flex text-black">
              <a className="hover:text-gray-400 flex items-center py-1 pl-6 pr-8" href="/easter">Easter</a>
              <a className="hover:text-gray-400 flex items-center py-1 pl-6 pr-8" href="/thanksgiving">Thanksgiving</a>
              <a className="hover:text-gray-400 flex items-center py-1 pl-6 pr-8" href="/christmas">Christmas</a>
              <a className="hover:text-gray-400 flex items-center py-1 pl-6 pr-8" href="/memorial-day">Memorial Day</a>
              <a className="hover:text-gray-400 flex items-center py-1 pl-6 pr-8" href="/independence-day">Independence Day</a>
            </div>
          </div>
          <a className="hover:text-gray-400" href="/edit-menu">Edit Menu</a>
        </div>
      </>
    )
  }

  export default NavBarLinks
