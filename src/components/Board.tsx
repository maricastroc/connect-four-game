import Image from 'next/image'
import { useState } from 'react'
import PlayOneArrow from '../../public/assets/images/marker-red.svg'

export const Board = () => {
  const columns = 7
  const rows = 6

  const [hoveredCol, setHoveredCol] = useState<number | null>(null)

  return (
    <div className="relative w-full max-w-[30rem] lg:max-w-full mx-auto">
      <div className="absolute -top-6 left-0 right-0 z-10">
        <div className="grid grid-cols-7 gap-1 md:gap-2 w-full px-2">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div key={`arrow-${colIndex}`} className="flex justify-center">
              {hoveredCol === colIndex && (
                <Image src={PlayOneArrow} alt="Player One Arrow" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Actual board */}
      <div className="bg-white border-[2px] border-black rounded-[1.25rem] md:rounded-[2rem] p-2 pb-[1.8rem] shadow-[0_8px_0_0_black] w-full relative z-0">
        <div className="grid grid-cols-7 gap-1 md:gap-2">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div
              key={`col-${colIndex}`}
              className="flex flex-col gap-1 md:gap-2 lg:gap-3 cursor-pointer p-0.5 md:p-1 rounded"
              onMouseEnter={() => setHoveredCol(colIndex)}
              onMouseLeave={() => setHoveredCol(null)}
            >
              {Array.from({ length: rows }).map((_, rowIndex) => (
                <div
                  key={`cell-${colIndex}-${rowIndex}`}
                  className="w-full aspect-square rounded-full bg-purple-300 border-2 border-black flex items-center justify-center shadow-[inset_0_8px_0_0_black]"
                />
              ))}
            </div>
          ))}
        </div>

        {/* Bottom panel */}
        <div className="flex flex-col text-center items-center justify-center w-[13rem] md:w-[18rem] bg-white p-3 py-2 border-2 border-black rounded-[1.2rem] absolute -bottom-[6rem] md:-bottom-[8.7rem] left-1/2 transform -translate-x-1/2">
          <p className="text-xs text-black font-bold">PLAYER 1 STARTS</p>
          <h3 className="text-md md:text-lg text-black font-bold">READY?</h3>

          <button className="mt-1 text-center text-xs text-white font-bold rounded-2xl md:w-[7.5rem] w-[6rem] bg-purple-500 flex items-center justify-center px-3 py-2 border-none">
            PLAY
          </button>
        </div>
      </div>
    </div>
  )
}
