'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import RenderAppetizers from './RenderAppetizers';
import { getAppetizers, createAppetizer, updateAppetizer, deleteAppetizer } from '../utils/menuCRUD';
// import Renders & gets for: Lunch, Bulk, Sides, Holiday

const EditMenuOptions = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [appetizers, setAppetizers] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [bulk, setBulk] = useState([]);
  const [sides, setSides] = useState([]);
  const [holidayItems, setHolidayItems] = useState([]);
  const router = useRouter();

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
              <h6 className='text-center'>- Click on a menu item to edit or delete that item, click save to update.</h6>
              <h6 className='text-center'>- Ensure any upcharge options include the price (example: <strong>Ranch +$0.50</strong>).</h6>
            <br />
            <br />
            <RenderAppetizers
              appetizers={appetizers}
              createAppetizer={createAppetizer}
              updateAppetizer={updateAppetizer}
              deleteAppetizer={deleteAppetizer}
              handleRemoveAppetizer={handleRemoveAppetizer}
            />
            {/* Lunch, Bulk, Sides, Holiday components */}
          </div>
        </>
      )}
    </>
  );
};

export default EditMenuOptions;