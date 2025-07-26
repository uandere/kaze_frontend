import React from 'react'
import Header from "@/components/layout/Header/Header"

const _404 = () => {
  return (
    <div>
      <Header/>
      <div className="relative flex flex-col items-center justify-center h-screen">
      <img
        src="/cone.svg"
        alt="Background"
        className="absolute w-[300px] h-[400px] right-80 bottom-40"
      />
      <div className='flex flex-col justify-start'>
        <h1 className="text-6xl font-bold relative text-[#ffd700]">404</h1>
        <h1 className="text-6xl font-bold relative">PAGE NOT FOUND!</h1>
      </div>
    </div>
    </div>
  )
}

export default _404