"use client";

import React, { useEffect, useState } from 'react';
import { getOrdersForTomorrow } from '../utils/getOrdersForTomorrow';
import RenderOrders from './RenderOrders';

const OrdersForTomorrow = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await getOrdersForTomorrow();
        setOrders(response.orders);
        setIsLoading(false)
      } catch (error) {
        console.error('Error fecthing orders: ', error)
        setIsLoading(false)
      }
    };
    
    fetchData();
  }, [])
  

  return (
    <>
    {isLoading ? <div className="text-white">Loading...</div> : 
      <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
        <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10 ">
          <RenderOrders orders={orders} />
        </div>
      </div>
    }
    </>

  );
}

export default OrdersForTomorrow;
