import React from 'react'
import OrdersForNextBusinessDay from '../components/OrdersForNextBusinessDay'

export default function page() {
  return (
    <>
      <main>
        <div className="flex flex-col items-center justify-start h-screen bg-black pt-[160px] overflow-auto">
          <OrdersForNextBusinessDay />
        </div>
      </main>
    </>
  )
}