/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Player } from '@/types/player'
import { Mode } from '@/types/mode'
import { Button } from './Button'
import TurnBackgroundPlayer1 from '../../public/assets/images/turn-background-red.svg'
import TurnBackgroundPlayer2 from '../../public/assets/images/turn-background-yellow.svg'

type GameStatusProps = {
  currentPlayer: Player
  hasGameStarted: boolean
  mode: Mode
  setCurrentPlayer: (player: Player) => void
  resetBoard: (isPlayAgainMode: boolean) => void
  winner: Player | undefined
}

export const GameStatus = ({
  currentPlayer,
  hasGameStarted,
  winner,
  mode,
  resetBoard,
  setCurrentPlayer,
}: GameStatusProps) => {
  const [countdown, setCountdown] = useState(30)

  const getPlayerText = () => {
    if (winner) {
      if (mode === 'pvp') return `PLAYER ${winner}`

      return winner === '1' ? 'YOU' : 'CPU'
    } else if (!hasGameStarted) {
      if (mode === 'pvc') {
        return currentPlayer === '1' ? 'YOU START' : 'CPU STARTS'
      }

      return currentPlayer === '1' ? 'PLAYER 1 STARTS' : 'PLAYER 2 STARTS'
    } else {
      if (mode === 'pvc') {
        return currentPlayer === '1' ? 'YOUR TURN' : 'CPU TURN'
      }

      return currentPlayer === '1' ? "PLAYER 1'S TURN" : "PLAYER 2'S TURN"
    }
  }

  const getWinText = () => {
    if (winner) {
      if (mode === 'pvc' && winner === '1') return 'WIN!'
      return 'WINS!'
    }
    return 'READY?'
  }

  useEffect(() => {
    if (!hasGameStarted || winner) return

    setCountdown(30)
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          setCurrentPlayer(currentPlayer === '1' ? '2' : '1')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [hasGameStarted, currentPlayer, winner])

  const isTurn = hasGameStarted && !winner

  return (
    <div className="absolute bottom-0 left-1/2 translate-y-[80%] md:translate-y-[70%] transform -translate-x-1/2 z-40">
      {isTurn ? (
        <>
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
        </>
      ) : (
        <div className="shadow-[0_9px_0_0_black] flex flex-col text-center items-center justify-center w-[13rem] sm:w-[18rem] bg-white p-3 py-2 border-2 border-black rounded-[1.2rem]">
          <p className="text-xs text-black font-bold">{getPlayerText()}</p>
          <h3 className="text-md sm:text-lg text-black font-bold">
            {getWinText()}
          </h3>
          <Button
            className="w-[8rem]"
            label={winner ? 'PLAY AGAIN' : 'PLAY'}
            onClick={() => {
              resetBoard(!!winner)
            }}
          />
        </div>
      )}
    </div>
  )
}
