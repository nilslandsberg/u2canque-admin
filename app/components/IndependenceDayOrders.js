"use client";

import React, { useEffect, useState } from 'react';
import RenderOrders from './RenderOrders';
import { getIndependenceDayOrders } from '../utils/getMemorialDayOrders';
import { useRouter } from 'next/navigation';

const IndependenceDayOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState("");

  const currentYear = new Date().getFullYear();
  const router = useRouter();
 
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    let token = ""
  
    if (user) {
      token = user.token;
    }
    
    const fetchData = async () => {
      try {
        const response = await getIndependenceDayOrders(token);
        setOrders(response.independenceDayOrders);
        if (response.independenceDayOrders.length > 0) {
          setDate(response.independenceDayOrders[0].pickUpDate); 
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching orders: ', error);
        router.push('/login');
      }
    };
    
    fetchData();
  }, [])
  
  return (
    <>
      {isLoading ? <div className="text-white text-center">Loading...</div> : 
        <>
          { orders.length === 0 ? (
            <div className="text-white text-center pt-4 text-2xl font-bold">There are no orders for Independence Day.</div>
          ) : (
            <>
              <div className="text-white z-35 font-bold text-center text-xl">Orders For Independence Day {currentYear}</div>
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

export default IndependenceDayOrders;
