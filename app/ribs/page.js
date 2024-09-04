import React from 'react'
import RibsFlashSaleOrders from '../components/RibsFlashSaleOrders'


export default function page() {
  return (
    <>
      <main>
        <div className="flex flex-col items-center justify-center bg-black pt-[160px]">
          <div className="max-w-screen-lg w-full h-screen overflow-auto">
            <RibsFlashSaleOrders/>
          </div>
        </div>
      </main>
    </>
  )
}