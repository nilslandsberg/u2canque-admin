import React from 'react'
import EditMenuOptions from '../components/EditMenuOptions'

export default function page() {
  return (
    <>
      <main>
        <div className="flex flex-col items-center justify-center bg-black pt-[160px]">
          <div className="max-w-screen-lg w-full overflow-auto">
          {/* ^ removed h-screen class as it was causing second scroll bar */}
            <EditMenuOptions />
          </div>
        </div>
      </main>
    </>
  )
}