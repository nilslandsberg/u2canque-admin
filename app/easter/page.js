import React from 'react'
import EasterOrders from '../components/EasterOrders'

export default function page() {
  return (
    <>
      <main>
        <div className="flex flex-col items-center justify-center bg-black pt-[160px]">
          <div className="max-w-screen-lg w-full h-screen overflow-auto">
            <EasterOrders />
          </div>
        </div>
      </main>
    </>
  )
}