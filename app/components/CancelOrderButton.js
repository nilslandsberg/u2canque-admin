import React from 'react'

const CancelButton = ({ orderId }) => {

  const handleClick = (id) => {
    console.log("Item Id: ", id);
  }
  return (
    <button className="z-30 py-2 px-3 bg-orange-600 rounded text-gray-900 hover:bg-orange-400 hover:text-white transition duration-300" onClick={() => handleClick(orderId)}>Cancel Order</button>
  )
}

export default CancelButton