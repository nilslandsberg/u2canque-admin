"use client";

import React from 'react'
import { useNavBarContext } from '../contexts/NavBarContext';
import { IoIosArrowDown } from 'react-icons/io';

function NavBarMobiledivs() {
  const { isToggled } = useNavBarContext();

  return (
    <>
      {isToggled && (
        <div className="text-white">
          <a className="block py-2 px-4 text-sm hover:bg-slate-700" href="/">Today</a>
          <a className="block py-2 px-4 text-sm hover:bg-slate-700" href="/next-business-day">Next Business Day</a>
          <a className="block py-2 px-4 text-sm hover:bg-slate-700" href="/next-week">Next Week</a>
          <div className="relative block py-2 px-4 group text-sm  transition-all">
            <div className="flex cursor-pointer items-center gap-2  group-hover:text-gray-400">
              <span>Holiday Orders</span>
              <IoIosArrowDown className="rotate-180 transition-all group-hover:rotate-0" />
            </div>
            <div className="absolute left-0 top-10 hidden w-auto flex-col gap-1 rounded-lg bg-white py-3 shadow-md transition-all group-hover:flex text-black">
              <a className="hover:text-gray-400 flex items-center py-1 pl-6 pr-8" href="/easter">Easter</a>
              <a className="hover:text-gray-400 flex items-center py-1 pl-6 pr-8" href="/thanksgiving">Thanksgiving</a>
              <a className="hover:text-gray-400 flex items-center py-1 pl-6 pr-8" href="/christmas">Christmas</a>
              <a className="hover:text-gray-400 flex items-center py-1 pl-6 pr-8" href="/memorial-day">Memorial Day</a>
              <a className="hover:text-gray-400 flex items-center py-1 pl-6 pr-8" href="/independence-day">Independence Day</a>
            </div>
          </div>
          <a className="block py-2 px-4 text-sm hover:bg-slate-700" href="/edit-menu">Edit Menu</a>
        </div>
      )}
    </>
  )
}

export default NavBarMobiledivs
