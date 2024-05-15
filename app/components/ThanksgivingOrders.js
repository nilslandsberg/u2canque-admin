"use client";

import React, { useEffect, useState } from 'react';
import RenderOrders from './RenderOrders';
import { getThanksgivingOrders } from '../utils/getThanksgivingOrders';
import { useRouter } from 'next/navigation';

const ThanksgivingOrders = () => {
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
        const response = await getThanksgivingOrders(token);
        setOrders(response.thanksgivingOrders);
        if (response.thanksgivingOrders.length > 0) {
          setDate(response.thanksgivingOrders[0].pickUpDate); 
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
            <div className="text-white text-center pt-4 text-2xl font-bold">There are no orders for Thanksgiving.</div>
          ) : (
            <>
              <div className="text-white z-35 font-bold text-center text-xl">Orders For Thanksgiving {currentYear}</div>
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

export default ThanksgivingOrders;
