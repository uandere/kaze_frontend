import React from 'react'
import Header from "@/components/layout/Header/Header"

const InProgress = () => {
  return (
    <div className=''>
      <Header/>
      <div className="relative flex flex-col items-center justify-center h-screen">
        <img
          src="/fixkey.svg"
          alt="Background"
          className="absolute w-[900px] h-[800px] opacity-60"
        />
        <div className='flex flex-col justify-start'>
          <h1 className="text-6xl font-bold relative">OOPS!</h1>
          <h2 className="text-5xl font-bold relative">This page is still in the workshop</h2>
          <p className='text-4xl font-thin skew-x-348 relative'>This page isn’t ready yet, but we’re working on something awesome!</p>
        </div>
      </div>
    </div>
  )
}

export default InProgress
