'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import RenderAppetizers from './RenderAppetizers';
// import RenderLunches from './RenderLunches';
// import RenderBulkBbq from './RenderBulkBbq'; 
// import RenderBulkSides from './RenderBulkSides'; 
// import RenderHolidays from './RenderHolidays'; 
import RenderModifiers from './RenderModifiers'; 
import { 
  getAppetizers, createAppetizer, updateAppetizer, deleteAppetizer, 
  getLunches, createLunch, updateLunch, deleteLunch,
  getBulkBbq, createBulkBbq, updateBulkBbq, deleteBulkBbq,
  getBulkSides, createBulkSides, updateBulkSides, deleteBulkSides,
  getHolidays, createHoliday, updateHoliday, deleteHoliday,
  getModifiers, updateModifiers
} from '../utils/menuCRUD';

const EditMenuOptions = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [appetizers, setAppetizers] = useState([]);
  const [lunches, setLunches] = useState([]);
  const [bulkBbq, setBulkBbq] = useState([]);
  const [bulkSides, setBulkSides] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [modifiers, setModifiers] = useState([]);
  const router = useRouter();

  // State variables for controlling section visibility
  const [isEditingTipsSectionOpen, setIsEditingTipsSectionOpen] = useState(true);
  const [isAppetizersSectionOpen, setIsAppetizersSectionOpen] = useState(false);
  const [isLunchSectionOpen, setIsLunchSectionOpen] = useState(false);
  const [isBulkBbqSectionOpen, setIsBulkBbqSectionOpen] = useState(false);
  const [isBulkSidesSectionOpen, setIsBulkSidesSectionOpen] = useState(false);
  const [isHolidaysSectionOpen, setIsHolidaysSectionOpen] = useState(false);
  const [isModifiersSectionOpen, setIsModifiersSectionOpen] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    let token = '';
    if (user) {
      token = user.token;
    }
  
    const fetchAppetizers = async () => {
      try {
        const fetchedAppetizers = await getAppetizers(token);
        setAppetizers(fetchedAppetizers);
      } catch (error) {
        console.error('Error fetching appetizers: ', error);
      }
    };
  
    const fetchLunches = async () => {
      try {
        const fetchedLunches = await getLunches(token);
        setLunches(fetchedLunches);
      } catch (error) {
        console.error('Error fetching lunches: ', error);
      }
    };
  
    const fetchBulkBbq = async () => {
      try {
        const fetchedBulkBbq = await getBulkBbq(token);
        setBulkBbq(fetchedBulkBbq);
      } catch (error) {
        console.error('Error fetching bulk BBQ: ', error);
      }
    };
  
    const fetchBulkSides = async () => {
      try {
        const fetchedBulkSides = await getBulkSides(token);
        setBulkSides(fetchedBulkSides);
      } catch (error) {
        console.error('Error fetching bulk sides: ', error);
      }
    };
  
    const fetchHolidays = async () => {
      try {
        const fetchedHolidays = await getHolidays(token);
        setHolidays(fetchedHolidays);
      } catch (error) {
        console.error('Error fetching holidays: ', error);
      }
    };
  
    const fetchModifiers = async () => {
      try {
        const fetchedModifiers = await getModifiers(token);
        setModifiers(fetchedModifiers);
      } catch (error) {
        console.error('Error fetching modifiers: ', error);
      }
    };
  
    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchAppetizers(),
        fetchLunches(),
        fetchBulkBbq(),
        fetchBulkSides(),
        fetchHolidays(),
        fetchModifiers()
      ]);
      setIsLoading(false);
    };
  
    fetchData();
  }, []);
  

  const handleRemoveAppetizer = (id) => {
    setAppetizers(appetizers.filter((appetizer) => appetizer._id !== id));
  };

  const handleRemoveLunch = (id) => {
    setLunches(lunches.filter((lunch) => lunch._id !== id));
  };

  const handleRemoveBulkBbq = (id) => {
    setBulkBbq(bulkBbq.filter((bbq) => bbq._id !== id));
  };

  const handleRemoveBulkSides = (id) => {
    setBulkSides(bulkSides.filter((side) => side._id !== id));
  };

  const handleRemoveHoliday = (id) => {
    setHolidays(holidays.filter((holiday) => holiday._id !== id));
  };

  return (
    <>
    {isLoading ? (
      <div className="text-white text-center">Loading...</div>
    ) : (
      <>
        <div className="text-white">
          <h1 className='font-bold text-xl text-center'>Edit Menu Options</h1>
          {/* Editing Tips Dropdown */}
          <div className="text-l text-left my-2 cursor-pointer flex justify-center" onClick={() => setIsEditingTipsSectionOpen(!isEditingTipsSectionOpen)} >
            <span>Editing Tips</span>
            <span>{isEditingTipsSectionOpen ? '▴' : '▾'}</span>
          </div>
          {isEditingTipsSectionOpen && (
            <div className="text-center">
              <h6>- Click on a section header to expand or hide those menu items.</h6>
              <h6>- Click on a menu item to edit or delete that item, click save to update.</h6>
              <h6>- Ensure any upcharge options include the price (example: Ranch +$0.50).</h6>
              <h6>- If you encounter issues while editing, saving, or deleting try refreshing page.</h6>
            </div>
          )}
          <br />
          <hr className="border-gray-600 my-4" />
          {/* Appetizers Section */}
          <div className="text-2xl font-bold text-left my-8 cursor-pointer flex justify-between items-center" onClick={() => setIsAppetizersSectionOpen(!isAppetizersSectionOpen)} >
            <span>APPETIZERS</span>
            <span>{isAppetizersSectionOpen ? '▴' : '▾'}</span>
          </div>
          {isAppetizersSectionOpen && (
            <>
              <RenderAppetizers
                appetizers={appetizers}
                createAppetizer={createAppetizer}
                updateAppetizer={updateAppetizer}
                deleteAppetizer={deleteAppetizer}
                handleRemoveAppetizer={handleRemoveAppetizer}
              />
            </>
          )}
          <hr className="border-gray-600 my-8" />
          {/* Lunch Section */}
          <div className="text-2xl font-bold text-left my-8 cursor-pointer flex justify-between items-center" onClick={() => setIsLunchSectionOpen(!isLunchSectionOpen)} >
            <span>LUNCH</span>
            <span>{isLunchSectionOpen ? '▴' : '▾'}</span>
          </div>
          {isLunchSectionOpen && (
            <>
              <RenderLunches
                lunches={lunches}
                createLunch={createLunch}
                updateLunch={updateLunch}
                deleteLunch={deleteLunch}
                handleRemoveLunch={handleRemoveLunch}
              />
            </>
          )}
          <hr className="border-gray-600 my-8" />
          {/* Bulk BBQ Section */}
          <div className="text-2xl font-bold text-left my-8 cursor-pointer flex justify-between items-center" onClick={() => setIsBulkBbqSectionOpen(!isBulkBbqSectionOpen)} >
            <span>BULK BBQ</span>
            <span>{isBulkBbqSectionOpen ? '▴' : '▾'}</span>
          </div>
          {isBulkBbqSectionOpen && (
            <>
              <RenderBulkBbq
                bulkBbq={bulkBbq}
                createBulkBbq={createBulkBbq}
                updateBulkBbq={updateBulkBbq}
                deleteBulkBbq={deleteBulkBbq}
                handleRemoveBulkBbq={handleRemoveBulkBbq}
              />
            </>
          )}
          <hr className="border-gray-600 my-8" />
          {/* Bulk Sides Section */}
          <div className="text-2xl font-bold text-left my-8 cursor-pointer flex justify-between items-center" onClick={() => setIsBulkSidesSectionOpen(!isBulkSidesSectionOpen)} >
            <span>BULK SIDES</span>
            <span>{isBulkSidesSectionOpen ? '▴' : '▾'}</span>
          </div>
          {isBulkSidesSectionOpen && (
            <>
              <RenderBulkSides
                bulkSides={bulkSides}
                createBulkSides={createBulkSides}
                updateBulkSides={updateBulkSides}
                deleteBulkSides={deleteBulkSides}
                handleRemoveBulkSides={handleRemoveBulkSides}
              />
            </>
          )}
          <hr className="border-gray-600 my-8" />
          {/* Holiday Items Section */}
          <div className="text-2xl font-bold text-left my-8 cursor-pointer flex justify-between items-center" onClick={() => setIsHolidaysSectionOpen(!isHolidaysSectionOpen)} >
            <span>HOLIDAY ITEMS</span>
            <span>{isHolidaysSectionOpen ? '▴' : '▾'}</span>
          </div>
          {isHolidaysSectionOpen && (
            <>
              <RenderHolidays
                holidays={holidays}
                createHoliday={createHoliday}
                updateHoliday={updateHoliday}
                deleteHoliday={deleteHoliday}
                handleRemoveHoliday={handleRemoveHoliday}
              />
            </>
          )}
          <hr className="border-gray-600 my-8" />
          {/* Modifiers Section */}
          <div className="text-2xl font-bold text-left my-8 cursor-pointer flex justify-between items-center" onClick={() => setIsModifiersSectionOpen(!isModifiersSectionOpen)} >
            <span>MODIFIERS (sides & bread options)</span>
            <span>{isModifiersSectionOpen ? '▴' : '▾'}</span>
          </div>
          {isModifiersSectionOpen && (
            <>
              <RenderModifiers
                modifiers={modifiers}
                updateModifiers={updateModifiers}
              />
            </>
          )}
        </div>
      </>
    )}
    </>
  );
};

export default EditMenuOptions;