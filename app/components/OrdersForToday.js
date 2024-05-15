"use client";

import React, { useEffect, useState } from 'react';
import { getOrdersForToday } from '../utils/getOrdersForToday';
import RenderOrders from './RenderOrders';
import OrderDate from './OrderDate';
import { useRouter } from 'next/navigation';

const OrdersForToday = () => {
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
        const response = await getOrdersForToday(token);
        setOrders(response.orders);
        if (response.orders.length > 0) {
          setDate(response.orders[0].date); 
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching orders: ', error);
        router.push('/login')
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
            <div className="text-white text-center pt-4 text-2xl font-bold">There are no orders for today.</div>
          ) : (
            <>
              <div className="text-white z-35 font-bold text-center text-xl">Orders To Be Picked Up Today, <OrderDate orderDate={date} /> </div>
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

export default OrdersForToday;
