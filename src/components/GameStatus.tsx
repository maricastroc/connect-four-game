import { useEffect, useState } from 'react'
import { Player } from '@/types/player'
import { Button } from './Button'
import TurnBackgroundPlayer1 from '../../public/assets/images/turn-background-red.svg'
import TurnBackgroundPlayer2 from '../../public/assets/images/turn-background-yellow.svg'
import Image from 'next/image'

type GameStatusProps = {
  currentPlayer: Player
  hasGameStarted: boolean
  setHasGameStarted: (value: boolean) => void
}

export const GameStatus = ({
  currentPlayer,
  hasGameStarted,
  setHasGameStarted,
}: GameStatusProps) => {
  const [countdown, setCountdown] = useState(30)

  useEffect(() => {
    if (!hasGameStarted) return

    setCountdown(30)

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [hasGameStarted, currentPlayer])

  if (hasGameStarted) {
    return (
      <div className="absolute bottom-0 left-1/2 translate-y-[80%] md:translate-y-[70%] transform -translate-x-1/2 z-40">
        <Image
          src={
            currentPlayer === '1'
              ? TurnBackgroundPlayer1
              : TurnBackgroundPlayer2
          }
          alt={`Turn background for player ${currentPlayer}`}
        />
        <div
          className={`w-full absolute -bottom-[1rem] sm:-bottom-[1rem] inset-0 flex flex-col items-center justify-center text-center px-2 ${
            currentPlayer === '1' ? 'text-white' : 'text-black'
          }`}
        >
          <p className="mt-[0.5rem] sm:mt-0 text-xs sm:text-sm font-bold">
            {currentPlayer === '1' ? "PLAYER 1'S TURN" : "PLAYER 2'S TURN"}
          </p>
          <h3 className="mt-[-0.5rem] sm:mt-0 text-lg font-bold">
            {countdown}s
          </h3>
        </div>
      </div>
    )
  }

  return (
    <div className="shadow-[0_9px_0_0_black] flex flex-col text-center items-center justify-center w-[13rem] sm:w-[18rem] bg-white p-3 py-2 border-2 border-black rounded-[1.2rem] absolute left-1/2  translate-y-[290%] transform -translate-x-1/2 z-40">
      <p className="text-xs text-black font-bold">
        {currentPlayer === '1' ? "PLAYER 1'S TURN" : "PLAYER 2'S TURN"}
      </p>
      <h3 className="text-md sm:text-lg text-black font-bold">READY?</h3>
      <Button label="PLAY" onClick={() => setHasGameStarted(true)} />
    </div>
  )
}
