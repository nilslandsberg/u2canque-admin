import React from 'react'
import ThanksgivingOrders from '../components/ThanksgivingOrders'

export default function page() {
  return (
    <>
      <main>
        <div className="flex flex-col items-center justify-center bg-black pt-[160px]">
          <div className="max-w-screen-lg w-full h-screen overflow-auto">
            <ThanksgivingOrders />
          </div>
        </div>
      </main>
    </>
  )
}