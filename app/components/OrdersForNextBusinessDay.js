"use client";

import React, { useEffect, useState } from 'react';
import { getOrdersForNextBusinessDay } from '../utils/getOrdersForNextBusinessDay';
import RenderOrders from './RenderOrders';
import OrderDate from './OrderDate';

const OrdersForNextBusinessDay = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOrdersForNextBusinessDay();
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
        <div className="text-white z-35 font-bold text-center text-xl">Orders For Next Business Day, <OrderDate orderDate={date} /></div>
          <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10 ">
            <RenderOrders orders={orders} />
          </div>
      </>
    }
    </>

  );
}

export default OrdersForNextBusinessDay;
