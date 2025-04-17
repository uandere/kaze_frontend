import React from 'react'

const New = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <div className="flex flex-col items-center justify-center gap-10">
          <h1 className="text-4xl font-bold">
            Тепер, підтвердіть свій профіль викорстовуючи Дія
          </h1>
          <h2 className="text-4xl font-thin">
            ... таким чином Ви зробите все щоб ми спростили Вашу оренду 👌
          </h2>
          <button
            className="mt-4 text-2xl bg-[#000000] text-white p-4 rounded-2xl flex flex-row items-center justify-center gap-10 px-16 border"
          >
            <img src="diiaStroke.svg" width={"52px"} />
            Увійти через Дія
          </button>
          <button className="text-[#ffd700] underline text-xl">Ні, повернутись на головну</button>
          <button
            className="mt-4 text-gray-300  p-3 rounded-lg underline"
          >
            Вийти з акаунту
          </button>
        </div>
    </div>
  )
}

export default New