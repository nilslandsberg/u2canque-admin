import React from 'react'
import { cancelOrder } from '../utils/cancelOrder';
import { cancelHolidayOrder } from '../utils/cancelHolidayOrder';

const CancelButton = ({ orderId, holiday }) => {

  const handleClick = (id) => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this order?');
    
    if (confirmCancel) {
      if (holiday) {
        cancelHolidayOrder(id);
      } else {
        cancelOrder(id);
      }
    }
  }
  
  return (
    <button className="z-30 py-2 px-3 bg-orange-600 rounded text-gray-900 hover:bg-orange-400 hover:text-white transition duration-300" onClick={() => handleClick(orderId)}>Cancel Order</button>
  )
}

export default CancelButton