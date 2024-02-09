"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

const NavBarContext = createContext();

export const NavBarContextProvider = ({ children }) => {
  const [isToggled, setIsToggled] = useState(false);
  
  return (
    <NavBarContext.Provider value={{ isToggled, setIsToggled }}>
      {children}
    </NavBarContext.Provider>
  );
};

export const useNavBarContext = () => {
  return useContext(NavBarContext);
};