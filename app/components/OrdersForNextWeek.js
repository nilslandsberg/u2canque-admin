"use client";

import React, { useEffect, useState } from 'react';
import { getOrdersForNextWeek } from '../utils/getOrdersForNextWeek';
import RenderOrders from './RenderOrders';

const OrdersForNextWeek = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOrdersForNextWeek();
        setOrders(response.orders);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching orders: ', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [])

  return (
    <>
      {isLoading ? <div className="text-white text-center">Loading...</div> : 
        <>
          { orders.length === 0 ? (
              <div className="text-white text-center pt-4 text-2xl font-bold">There are no upcoming orders.</div>
            ) : (
              <>
                <div className="text-white z-35 font-bold text-center text-xl">Orders For The Next Week</div>
                <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10 ">
                  <RenderOrders orders={orders} />
                </div>
              </>
            )
          }
        </>
      }
    </>

  );
}

export default OrdersForNextWeek;
