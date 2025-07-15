/* eslint-disable react-hooks/exhaustive-deps */
import Image from 'next/image'
import { useState, useEffect } from 'react'

import WhiteBoardLayer from '../../public/assets/images/board-layer-white-large.svg'
import BlackBoardLayer from '../../public/assets/images/board-layer-black-large.svg'

import { ColumnArrows } from './ColumnArrows'
import { GameStatus } from './GameStatus'
import { DropAnimationStyles } from './DropAnimationStyles'
import { GameGrid } from './GameGrid'

import { ANIMATION_DURATION, ROWS } from '@/utils/constants'
import { Cell } from '@/types/cell'
import { PiecePosition } from '@/types/piece-position'
import { Difficulty } from '@/types/difficulty'
import { getBestMove } from '@/utils/getBestMove'
import { Score } from '@/types/score'
import { checkWin } from '@/utils/checkWin'
import { Player } from '@/types/player'
import { Mode } from '@/types/mode'
import { initializeBoard } from '@/utils/initializeBoard'

type BoardProps = {
  mode: Mode
  difficulty: Difficulty
  score: Score
  board: Cell[][]
  winner: Player | undefined
  hasGameStarted: boolean
  isGamePaused: boolean
  setHasGameStarted: (value: boolean) => void
  setWinner: (player: Player | undefined) => void
  setBoard: (value: Cell[][]) => void
  setScore: React.Dispatch<React.SetStateAction<Score>>
  currentPlayer: Player
  setCurrentPlayer: (player: Player) => void
  startingPlayer: Player
  setStartingPlayer: (player: Player) => void
}

export const Board = ({
  mode,
  difficulty,
  board,
  winner,
  hasGameStarted,
  isGamePaused,
  currentPlayer,
  startingPlayer,
  setCurrentPlayer,
  setStartingPlayer,
  setHasGameStarted,
  setWinner,
  setBoard,
  setScore,
}: BoardProps) => {
  const [hoveredCol, setHoveredCol] = useState<number | null>(null)

  const [droppingPiece, setDroppingPiece] = useState<PiecePosition | null>(null)

  const isVsCPU = mode === 'pvc'

  function resetBoard(isPlayAgainMode: boolean) {
    setBoard(initializeBoard())
    setWinner(undefined)
    setHasGameStarted(true)

    if (isPlayAgainMode) {
      const nextStarter = startingPlayer === '1' ? '2' : '1'
      setStartingPlayer(nextStarter)
      setCurrentPlayer(nextStarter)
    } else {
      setCurrentPlayer(startingPlayer)
    }
  }

  const handleColumnClick = (colIndex: number) => {
    if (!hasGameStarted) {
      return
    }

    for (let rowIndex = ROWS - 1; rowIndex >= 0; rowIndex--) {
      if (!board[rowIndex][colIndex]) {
        const newBoard = [...board]
        newBoard[rowIndex][colIndex] = currentPlayer
        setBoard(newBoard)
        setDroppingPiece({
          col: colIndex,
          row: rowIndex,
          player: currentPlayer,
        })

        if (checkWin(newBoard, currentPlayer)) {
          setWinner(currentPlayer)

          setScore((prev) => ({
            ...prev,
            [currentPlayer]: prev[currentPlayer] + 1,
          }))

          setHasGameStarted(false)
          return
        }

        setCurrentPlayer(currentPlayer === '1' ? '2' : '1')
        break
      }
    }
  }

  useEffect(() => {
    if (droppingPiece) {
      const timer = setTimeout(() => setDroppingPiece(null), ANIMATION_DURATION)
      return () => clearTimeout(timer)
    }
  }, [droppingPiece])

  useEffect(() => {
    if (!hasGameStarted || !isVsCPU || currentPlayer !== '2' || droppingPiece)
      return

    const cpuPlayTimeout = setTimeout(() => {
      const bestCol = getBestMove(board, difficulty)

      if (bestCol !== null) {
        handleColumnClick(bestCol)
      }
    }, 400)

    return () => clearTimeout(cpuPlayTimeout)
  }, [currentPlayer, hasGameStarted, isVsCPU, board, droppingPiece])

  return (
    <div className="relative w-full max-w-[500px] md:min-w-[500px] md:max-w-[632px] mx-auto aspect-[632/594]">
      <BackgroundLayers />

      <GameGrid
        board={board}
        droppingPiece={droppingPiece}
        onColumnClick={handleColumnClick}
        hoveredCol={hoveredCol}
        setHoveredCol={setHoveredCol}
        hasGameStarted={hasGameStarted}
      />

      <WhiteLayer />

      <ColumnArrows hoveredCol={hoveredCol} />

      <GameStatus
        currentPlayer={currentPlayer}
        hasGameStarted={hasGameStarted}
        winner={winner}
        isGamePaused={isGamePaused}
        setCurrentPlayer={(player) => setCurrentPlayer(player)}
        mode={mode}
        resetBoard={resetBoard}
      />

      <DropAnimationStyles />
    </div>
  )
}

const BackgroundLayers = () => (
  <>
    <div className="absolute inset-0 bg-purple rounded-[40px]" />
    <div className="absolute inset-0 z-10 pointer-events-none">
      <Image
        src={BlackBoardLayer}
        alt="Black Layer"
        className="w-full h-full object-cover"
      />
    </div>
  </>
)

const WhiteLayer = () => (
  <div
    className="absolute inset-0 z-30 pointer-events-none"
    style={{ bottom: '10px' }}
  >
    <Image
      src={WhiteBoardLayer}
      alt="White Layer"
      className="w-full h-full object-cover"
    />
  </div>
)
