'use client'

import React, { useEffect, useState } from 'react';
import RenderMenuItems from './RenderMenuItems';
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

  // State variables for controlling section visibility
  const [isEditingTipsSectionOpen, setIsEditingTipsSectionOpen] = useState(false);
  const [isAppetizersSectionOpen, setIsAppetizersSectionOpen] = useState(false);
  const [isLunchSectionOpen, setIsLunchSectionOpen] = useState(false);
  const [isBulkBbqSectionOpen, setIsBulkBbqSectionOpen] = useState(false);
  const [isBulkSidesSectionOpen, setIsBulkSidesSectionOpen] = useState(false);
  const [isHolidaysSectionOpen, setIsHolidaysSectionOpen] = useState(false);
  const [isModifiersSectionOpen, setIsModifiersSectionOpen] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchData(getAppetizers, setAppetizers, 'fetching appetizers'),
        fetchData(getLunches, setLunches, 'fetching lunches'),
        fetchData(getBulkBbq, setBulkBbq, 'fetching bulk BBQ'),
        fetchData(getBulkSides, setBulkSides, 'fetching bulk sides'),
        fetchData(getHolidays, setHolidays, 'fetching holidays'),
        fetchData(getModifiers, setModifiers, 'fetching modifiers')
      ]);
      setIsLoading(false);
    };
  
    fetchAllData();
  }, []);

  const fetchData = async (getData, setState, errorMessage) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user ? user.token : '';
      const data = await getData(token);
      setState(data);
    } catch (error) {
      console.error(`Error ${errorMessage}: `, error);
    }
  };

  // handleCreateNewItem updates local state when new items are created on server to keep parent/child states in sync
  // this is a great canidate for using Redux, but as we're so far along and almost finished this solution is fine for now
  const handleCreateNewItem = (newItem, sectionName) => {
    switch (sectionName) {
      case 'appetizers':
        setAppetizers([...appetizers, newItem]);
        break;
      case 'lunch':
        setLunches([...lunches, newItem]);
        break;
      case 'bulk':
        setBulkBbq([...bulkBbq, newItem]);
        break;
      case 'sides':
        setBulkSides([...bulkSides, newItem]);
        break;
      case 'holiday-items':
        setHolidays([...holidays, newItem]);
        break;
      default:
        break;
    }
  };

  const removeItem = (state, setState, id) => {
    setState(state.filter((item) => item._id !== id));
  };

  const handleRemoveAppetizer = (id) => removeItem(appetizers, setAppetizers, id);
  const handleRemoveLunch = (id) => removeItem(lunches, setLunches, id);
  const handleRemoveBulkBbq = (id) => removeItem(bulkBbq, setBulkBbq, id);
  const handleRemoveBulkSides = (id) => removeItem(bulkSides, setBulkSides, id);
  const handleRemoveHoliday = (id) => removeItem(holidays, setHolidays, id);

  return (
    <>
    {isLoading ? (
      <div className="text-white text-center">Loading...</div>
    ) : (
      <>
        <div className="text-white">
          <h1 className='font-bold text-xl text-center'>Edit Menu Options</h1>

          {/* Editing Tips */}
          <div>
            <div className="text-l text-left my-2 cursor-pointer flex justify-center" onClick={() => setIsEditingTipsSectionOpen(!isEditingTipsSectionOpen)} >
              <span>Editing Tips</span>
              <span>{isEditingTipsSectionOpen ? '▴' : '▾'}</span>
            </div>
            {isEditingTipsSectionOpen && (
              <div className="text-center">
                <h6>- Click on a section header to show or hide those menu items.</h6>
                <h6>- Click the EDIT button to edit or delete an item, click save to update.</h6>
                <h6>- Click the ADD NEW ITEM button create a new item in that section, click save.</h6>
                <h6>- Ensure any new upcharge options include the price (examples: Ranch +$0.50 / Breast +$1.50).</h6>
              </div>
            )}
            <br />
            <hr className="border-gray-600 my-4" />
          </div>

          {/* Appetizers Section */}
          <div>
            <div className="text-2xl font-bold text-left my-8 cursor-pointer flex justify-between items-center" onClick={() => setIsAppetizersSectionOpen(!isAppetizersSectionOpen)} >
              <span>APPETIZERS</span>
              <span>{isAppetizersSectionOpen ? '▴' : '▾'}</span>
            </div>
            {isAppetizersSectionOpen && (
              <>
                <RenderMenuItems
                  menuItems={appetizers}
                  createItem={createAppetizer}
                  updateItem={updateAppetizer}
                  deleteItem={deleteAppetizer}
                  handleRemoveItem={handleRemoveAppetizer}
                  handleCreateNewItem={handleCreateNewItem}
                  sectionName="appetizer"
                  options={['sauce', 'dressing']}
                />
              </>
            )}
            <hr className="border-gray-600 my-8" />
          </div>

          {/* Lunch Section */}
          <div>
            <div className="text-2xl font-bold text-left my-8 cursor-pointer flex justify-between items-center" onClick={() => setIsLunchSectionOpen(!isLunchSectionOpen)} >
              <span>LUNCH</span>
              <span>{isLunchSectionOpen ? '▴' : '▾'}</span>
            </div>
            {isLunchSectionOpen && (
              <>
                <RenderMenuItems
                  menuItems={lunches}
                  createItem={createLunch}
                  updateItem={updateLunch}
                  deleteItem={deleteLunch}
                  handleRemoveItem={handleRemoveLunch}
                  handleCreateNewItem={handleCreateNewItem}
                  sectionName="lunch"
                  options={['sauce', 'chicken', 'toppings']}
                />
              </>
            )}
            <hr className="border-gray-600 my-8" />
          </div>

          {/* Bulk BBQ Section */}
          <div>
            <div className="text-2xl font-bold text-left my-8 cursor-pointer flex justify-between items-center" onClick={() => setIsBulkBbqSectionOpen(!isBulkBbqSectionOpen)} >
              <span>BULK BBQ</span>
              <span>{isBulkBbqSectionOpen ? '▴' : '▾'}</span>
            </div>
            {isBulkBbqSectionOpen && (
              <>
                <RenderMenuItems
                  menuItems={bulkBbq}
                  createItem={createBulkBbq}
                  updateItem={updateBulkBbq}
                  deleteItem={deleteBulkBbq}
                  handleRemoveItem={handleRemoveBulkBbq}
                  handleCreateNewItem={handleCreateNewItem}
                  sectionName="bulk"
                />
              </>
            )}
            <hr className="border-gray-600 my-8" />

          </div>

          {/* Bulk Sides Section */}
          <div>
            <div className="text-2xl font-bold text-left my-8 cursor-pointer flex justify-between items-center" onClick={() => setIsBulkSidesSectionOpen(!isBulkSidesSectionOpen)} >
              <span>BULK SIDES</span>
              <span>{isBulkSidesSectionOpen ? '▴' : '▾'}</span>
            </div>
            {isBulkSidesSectionOpen && (
              <>
                <RenderMenuItems
                  menuItems={bulkSides}
                  createItem={createBulkSides}
                  updateItem={updateBulkSides}
                  deleteItem={deleteBulkSides}
                  handleRemoveItem={handleRemoveBulkSides}
                  handleCreateNewItem={handleCreateNewItem}
                  sectionName="sides"
                />
              </>
            )}
            <hr className="border-gray-600 my-8" />
          </div>

          {/* Holiday Items Section */}
          <div>
            <div className="text-2xl font-bold text-left my-8 cursor-pointer flex justify-between items-center" onClick={() => setIsHolidaysSectionOpen(!isHolidaysSectionOpen)} >
              <span>HOLIDAY ITEMS</span>
              <span>{isHolidaysSectionOpen ? '▴' : '▾'}</span>
            </div>
            {isHolidaysSectionOpen && (
              <>
                <RenderMenuItems
                  menuItems={holidays}
                  createItem={createHoliday}
                  updateItem={updateHoliday}
                  deleteItem={deleteHoliday}
                  handleRemoveItem={handleRemoveHoliday}
                  handleCreateNewItem={handleCreateNewItem}
                  sectionName="holiday"
                />
              </>
            )}
            <hr className="border-gray-600 my-8" />
          </div>
          
          {/* Modifiers Section */}
          <div>
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
        </div>
      </>
    )}
    </>
  );
};

export default EditMenuOptions;