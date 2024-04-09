"use client";

import React, { useEffect, useState } from 'react';
import { getOrdersForNextBusinessDay } from '../utils/getOrdersForNextBusinessDay';
import RenderOrders from './RenderOrders';
import OrderDate from './OrderDate';
import { useRouter } from 'next/navigation';

const OrdersForNextBusinessDay = () => {
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
        const response = await getOrdersForNextBusinessDay(token);
        setOrders(response.orders);
        if (response.orders.length > 0) {
          setDate(response.orders[0].date); 
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
            <div className="text-white text-center pt-4 text-2xl font-bold">There are no orders for the next business day.</div>
          ) : (
            <>
              <div className="text-white z-35 font-bold text-center text-xl">Orders For Next Business Day, <OrderDate orderDate={date} /> </div>
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

export default OrdersForNextBusinessDay;
