import React from 'react'
import LoginForm from '../components/LoginForm'

const page = () => {

  return (
    <>
    <main>
      <div className="flex flex-col items-center justify-center bg-black pt-[160px]">
        <div className="max-w-screen-lg w-full h-screen overflow-auto">
          <LoginForm />
        </div>
      </div>
    </main>
  </>
  )
}

export default page