'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import RenderAppetizers from './RenderAppetizers';
// import RenderLunch and other section components 
import { getAppetizers, createAppetizer, updateAppetizer, deleteAppetizer } from '../utils/menuCRUD';

const EditMenuOptions = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [appetizers, setAppetizers] = useState([]);
  const [lunches, setLunches] = useState([]);
  const [bulkBbq, setBulkBbq] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [modifiers, setModifiers] = useState([]);
  const router = useRouter();

  // State variables for controlling section visibility
  const [isEditingTipsSectionOpen, setIsEditingTipsSectionOpen] = useState(false);
  const [isAppetizersSectionOpen, setIsAppetizersSectionOpen] = useState(false);
  const [isLunchSectionOpen, setIsLunchSectionOpen] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    let token = '';
    if (user) {
      token = user.token;
    }

    const fetchData = async () => {
      try {
        const fetchedAppetizers = await getAppetizers(token);
        setAppetizers(fetchedAppetizers);
      } catch (error) {
        console.error('Error fetching appetizers: ', error);
        router.push('login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRemoveAppetizer = (id) => {
    setAppetizers(appetizers.filter((appetizer) => appetizer._id !== id));
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
              <>
                <div className="text-center">
                  <h6>- Click on a section header to expand or hide those menu items.</h6>
                  <h6>- Click on a menu item to edit or delete that item, click save to update.</h6>
                  <h6>- Ensure any upcharge options include the price (example: Ranch +$0.50).</h6>
                  <h6>- If you encounter issues while editing, saving, or deleting try refreshing page.</h6>
                </div>
              </>
            )}
            <br />
            <hr className="border-gray-600 my-4" />
            <div className="text-2xl font-bold text-left my-8 cursor-pointer flex justify-between items-center" onClick={() => setIsAppetizersSectionOpen(!isAppetizersSectionOpen)} >
              <span>APPETIZERS</span>
              <span>{isAppetizersSectionOpen ? '▴' : '▾'}</span>
            </div>
            {isAppetizersSectionOpen && (
              <>
                <hr className="border-gray-600 my-4" />
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
            <div className="text-2xl font-bold text-left my-8 cursor-pointer flex justify-between items-center" onClick={() => setIsLunchSectionOpen(!isLunchSectionOpen)} >
              <span>LUNCH</span>
              <span>{isLunchSectionOpen ? '▴' : '▾'}</span>
            </div>
            {isLunchSectionOpen && (
              <>
                <hr className="border-gray-600 my-8" />
                {/* Add RenderLunch component here */}
              </>
            )}
            <hr className="border-gray-600 my-4" />
            {/* Add similar sections for Bulk, Sides, and Holiday with their respective components */}
          </div>
        </>
      )}
    </>
  );
};

export default EditMenuOptions;
