import Image from 'next/image'
import { useState, useEffect } from 'react'

import WhiteBoardLayer from '../../public/assets/images/board-layer-white-large.svg'
import BlackBoardLayer from '../../public/assets/images/board-layer-black-large.svg'

import { ColumnArrows } from './ColumnArrows'
import { GameStatus } from './GameStatus'
import { DropAnimationStyles } from './DropAnimationStyles'
import { GameGrid } from './GameGrid'

import { ANIMATION_DURATION, COLUMNS, ROWS } from '@/utils/constants'
import { Cell } from '@/types/cell'
import { PiecePosition } from '@/types/piece-position'

export const Board = () => {
  const [board, setBoard] = useState<Cell[][]>(initializeBoard())

  const [currentPlayer, setCurrentPlayer] = useState<'1' | '2'>('1')

  const [hoveredCol, setHoveredCol] = useState<number | null>(null)

  const [droppingPiece, setDroppingPiece] = useState<PiecePosition | null>(null)

  const [hasGameStarted, setHasGameStarted] = useState(false)

  function initializeBoard(): Cell[][] {
    return Array(ROWS)
      .fill(null)
      .map(() => Array(COLUMNS).fill(null))
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
        setHasGameStarted={(value) => setHasGameStarted(value)}
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
