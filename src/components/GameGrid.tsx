import { Cell } from '@/types/cell'
import { PiecePosition } from '@/types/piece-position'
import { COLUMNS, ROWS } from '@/utils/constants'
import { GameSlot } from './GameSlot'

type GameGridProps = {
  board: Cell[][]
  droppingPiece: PiecePosition | null
  onColumnClick: (colIndex: number) => void
  hoveredCol: number | null
  setHoveredCol: (col: number | null) => void
  hasGameStarted: boolean
  winningCells: [number, number][]
}

export const GameGrid = ({
  board,
  droppingPiece,
  hasGameStarted,
  winningCells,
  onColumnClick,
  setHoveredCol,
}: GameGridProps) => {
  return (
    <div
      className="absolute inset-0 z-20 grid grid-cols-7"
      style={{
        top: '3%',
        bottom: '10%',
        left: '1.5%',
        right: '1.5%',
      }}
    >
      {Array.from({ length: COLUMNS }).map((_, colIndex) => (
        <div
          key={`col-${colIndex}`}
          className={`relative h-full ${hasGameStarted && 'cursor-pointer'}`}
          onClick={() => onColumnClick(colIndex)}
          onMouseEnter={() => {
            if (hasGameStarted) {
              setHoveredCol(colIndex)
            }
          }}
          onMouseLeave={() => setHoveredCol(null)}
        >
          <div className="absolute top-0 left-0 right-0 h-full flex flex-col px-[4.5%] gap-[2%]">
            {Array.from({ length: ROWS }).map((_, rowIndex) => {
              const isWinningCell = winningCells.some(
                ([r, c]) => r === rowIndex && c === colIndex,
              )

              return (
                <GameSlot
                  key={`slot-${colIndex}-${rowIndex}`}
                  cell={board[rowIndex][colIndex]}
                  isDropping={
                    droppingPiece?.col === colIndex &&
                    droppingPiece?.row === rowIndex
                  }
                  player={droppingPiece?.player}
                  isWinningCell={isWinningCell}
                />
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
