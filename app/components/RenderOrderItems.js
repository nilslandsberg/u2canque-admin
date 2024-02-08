import React from 'react'
import RenderItemOptions from './RenderItemOptions';
import CancelButton from './CancelOrderButton';

const RenderOrderItems = ({ items }) => {
  return (
    <div>
      {items.map((item, index) => (
        <div key={index} className="flex flex-col text-white mb-4 px-2">
          <div className="text-xl font-semibold">{item.name}</div>
          <div className="flex flex-col text-white pt-2">
            {item.options ? <RenderItemOptions options={item.options} /> : <></>}
            {item.sideTwo ? (
              <>
                <div className="ml-4 font-semibold">Sides:</div>
                <div className="ml-8">{item.sideOne}</div>
                <div className="ml-8">{item.sideTwo}</div>
              </>
            ) : <></>}
            {item.sideOne && !item.sideTwo ? <div className="ml-4 font-semibold">Side: {item.sideOne}</div> : <></>}
            {item.bread ? <div className="ml-4 font-semibold">Bread: {item.bread}</div> : <></>}
            {item.size ? <div className="ml-4 font-semibold"> Size: {item.size.split(":")[0]}</div> : <></>}
            <div className="ml-4 font-semibold">Quantity: {item.quantity}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RenderOrderItems
