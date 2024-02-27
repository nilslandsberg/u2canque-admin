"use client";

import React, { useEffect, useState } from 'react';
import RenderOrders from './RenderOrders';
import { getEasterOrders } from '../utils/getEasterOrders';

const EasterOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState("");

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEasterOrders();
        setOrders(response.easterOrders);
        setDate(response.easterOrders[0].pickUpDate); 
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
            <div className="text-white text-center pt-4 text-2xl font-bold">There are no orders for Easter.</div>
          ) : (
            <>
              <div className="text-white z-35 font-bold text-center text-xl">Orders For Easter {currentYear}</div>
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

export default EasterOrders;
