"use client";

import React, { useEffect, useState } from 'react';
import RenderOrders from './RenderOrders';
import { getRibsFlashSaleOrders } from '../utils/getRibsFlashSaleOrders';
import { useRouter } from 'next/navigation';

const RibsFlashSaleOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState("");

  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    let token = ""
  
    if (user) {
      token = user.token;
    }

    const fetchData = async () => {
      try {
        const response = await getRibsFlashSaleOrders(token);
        setOrders(response.ribsFlashSaleOrders);
        if (response.ribsFlashSaleOrders.length > 0) {
          setDate(response.ribsFlashSaleOrders[0].pickUpDate); 
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
      {isLoading ? <div className="flex items-center justify-center h-screen">
          <div className="w-16 h-16 border-t-4 border-b-4 border-white rounded-full animate-spin"></div>
        </div> : 
        <>
          { orders.length === 0 ? (
            <div className="text-white text-center pt-4 text-2xl font-bold">There are no orders for the Ribs Flash Sale.</div>
          ) : (
            <>
              <div className="text-white z-35 font-bold text-center text-xl">Orders For Ribs Flash Sale</div>
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

export default RibsFlashSaleOrders;
