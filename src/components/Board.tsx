import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'

import WhiteBoardLayer from '../../public/assets/images/board-layer-white-large.svg'
import BlackBoardLayer from '../../public/assets/images/board-layer-black-large.svg'

import { ColumnArrows } from './ColumnArrows'
import { GameStatus } from './GameStatus'
import { DropAnimationStyles } from './DropAnimationStyles'
import { GameGrid } from './GameGrid'

import { ANIMATION_DURATION, ROWS } from '@/utils/constants'
import { PiecePosition } from '@/types/piece-position'
import { getBestMove } from '@/utils/getBestMove'
import { checkWin } from '@/utils/checkWin'
import { initializeBoard } from '@/utils/initializeBoard'
import { useGame } from '@/context/GameContext'

export const Board = () => {
  const {
    mode,
    difficulty,
    board,
    setBoard,
    winner,
    setWinner,
    hasGameStarted,
    setHasGameStarted,
    isGamePaused,
    currentPlayer,
    setCurrentPlayer,
    startingPlayer,
    setStartingPlayer,
    setScore,
    setWinningCells,
    winningCells,
  } = useGame()

  const [hoveredCol, setHoveredCol] = useState<number | null>(null)
  const [droppingPiece, setDroppingPiece] = useState<PiecePosition | null>(null)

  const isVsCPU = mode === 'pvc'

  const resetBoard = useCallback(
    (isPlayAgainMode: boolean) => {
      setBoard(initializeBoard())
      setWinner(undefined)
      setHasGameStarted(true)
      setWinningCells([])

      if (isPlayAgainMode) {
        const nextStarter = startingPlayer === '1' ? '2' : '1'
        setStartingPlayer(nextStarter)
        setCurrentPlayer(nextStarter)
      } else {
        setCurrentPlayer(startingPlayer)
      }
    },
    [startingPlayer, setBoard, setWinner, setHasGameStarted, setWinningCells, setStartingPlayer, setCurrentPlayer],
  )

  const handleColumnClick = useCallback(
    (colIndex: number) => {
      if (!hasGameStarted) return

      for (let rowIndex = ROWS - 1; rowIndex >= 0; rowIndex--) {
        if (!board[rowIndex][colIndex]) {
          const newBoard = board.map((row) => [...row])
          newBoard[rowIndex][colIndex] = currentPlayer
          setBoard(newBoard)
          setDroppingPiece({ col: colIndex, row: rowIndex, player: currentPlayer })

          const [didWin, winningPositions] = checkWin(newBoard, currentPlayer)
          if (didWin) {
            setWinner(currentPlayer)
            setWinningCells(winningPositions)
            setScore((prev) => ({ ...prev, [currentPlayer]: prev[currentPlayer] + 1 }))
            setHasGameStarted(false)
            return
          }

          setCurrentPlayer(currentPlayer === '1' ? '2' : '1')
          break
        }
      }
    },
    [hasGameStarted, board, currentPlayer, setBoard, setWinner, setWinningCells, setScore, setHasGameStarted, setCurrentPlayer],
  )

  useEffect(() => {
    if (!droppingPiece) return
    const timer = setTimeout(() => setDroppingPiece(null), ANIMATION_DURATION)
    return () => clearTimeout(timer)
  }, [droppingPiece])

  useEffect(() => {
    if (!hasGameStarted || !isVsCPU || currentPlayer !== '2' || droppingPiece) return

    const timer = setTimeout(() => {
      const bestCol = getBestMove(board, difficulty)
      if (bestCol !== null) handleColumnClick(bestCol)
    }, 400)

    return () => clearTimeout(timer)
  }, [currentPlayer, hasGameStarted, isVsCPU, board, droppingPiece, difficulty, handleColumnClick])

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
        winningCells={winningCells}
      />

      <WhiteLayer />

      <ColumnArrows hoveredCol={hoveredCol} />

      <GameStatus
        currentPlayer={currentPlayer}
        hasGameStarted={hasGameStarted}
        winner={winner}
        isGamePaused={isGamePaused}
        setCurrentPlayer={setCurrentPlayer}
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
      <Image src={BlackBoardLayer} alt="Black Layer" className="w-full h-full object-cover" />
    </div>
  </>
)

const WhiteLayer = () => (
  <div className="absolute inset-0 z-30 pointer-events-none" style={{ bottom: '10px' }}>
    <Image src={WhiteBoardLayer} alt="White Layer" className="w-full h-full object-cover" />
  </div>
)
