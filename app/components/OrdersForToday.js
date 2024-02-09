"use client";

import React, { useEffect, useState } from 'react';
import { getOrdersForToday } from '../utils/getOrdersForToday';
import RenderOrders from './RenderOrders';
import OrderDate from './OrderDate';

const OrdersForToday = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOrdersForToday();
        setOrders(response.orders);
        setDate(response.orders[0].date); 
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching orders: ', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [])
  
  console.log(date)

  return (
    <>
    {isLoading ? <div className="text-white text-center">Loading...</div> : 
      <>
        <div className="text-white z-35 font-bold text-center text-xl">Orders To Be Picked Up Today, <OrderDate orderDate={date} /></div>
        <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
          <div className="flex flex-nowrap ml-10 ">
            <RenderOrders orders={orders} />
          </div>
        </div>
      </>
    }
    </>

  );
}

export default OrdersForToday;
