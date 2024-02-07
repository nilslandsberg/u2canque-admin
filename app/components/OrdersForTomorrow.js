import React from 'react';
import { getOrdersForTomorrow } from '../utils/getOrdersForTomorrow';
import RenderOrders from './RenderOrders';

const OrdersForTomorrow = async () => {
  const response = await getOrdersForTomorrow();
  const orders = response.orders;

  return (
    <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
      <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10 ">
        <RenderOrders orders={orders} />
      </div>
    </div>
  );
}

export default OrdersForTomorrow;
