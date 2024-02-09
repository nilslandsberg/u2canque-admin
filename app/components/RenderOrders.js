import React from 'react';
import RenderOrderItems from './RenderOrderItems';
import CancelButton from './CancelOrderButton';

const RenderOrders = ({ orders }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto py-5 px-2">
      {orders.map((order) => (
        <div
          key={order._id}
          className="card bg-black p-2 text-white text-left shadow-md flex flex-col justify-start overflow-hidden border rounded" 
        >
          <div className="flex flex-col justify-start text-left font-semibold mb-1">
            <div>Customer: {order.customer.firstName} {order.customer.lastName}</div>
            <div>Phone: {order.customer.phone}</div>
            <div>E-mail: {order.customer.email}</div>
            <div>Pickup Time: {order.pickUpTime}</div>
          </div>
          <div className="border-b-2 border-gray-300 mb-2"></div>
          <div className="flex-grow">
            <RenderOrderItems items={order.items} />
          </div>
          <div className="mt-auto">
            <CancelButton orderId={order._id} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default RenderOrders;
