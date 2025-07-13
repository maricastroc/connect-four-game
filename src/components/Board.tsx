import Image from 'next/image'
import { useState, useEffect } from 'react'
import PlayOneArrow from '../../public/assets/images/marker-red.svg'
import WhiteBoardLayer from '../../public/assets/images/board-layer-white-large.svg'
import BlackBoardLayer from '../../public/assets/images/board-layer-black-large.svg'
import CounterRed from '../../public/assets/images/counter-red-large.svg'
import CounterYellow from '../../public/assets/images/counter-yellow-large.svg'

type Player = '1' | '2'
type Cell = Player | null

export const Board = () => {
  const columns = 7
  const rows = 6
  const [board, setBoard] = useState<Cell[][]>(
    Array(rows)
      .fill(null)
      .map(() => Array(columns).fill(null)),
  )

  const [currentPlayer, setCurrentPlayer] = useState<Player>('1')
  const [hoveredCol, setHoveredCol] = useState<number | null>(null)
  const [droppingPiece, setDroppingPiece] = useState<{
    col: number
    row: number
    player: Player
  } | null>(null)

  const handleColumnClick = (colIndex: number) => {
    for (let rowIndex = rows - 1; rowIndex >= 0; rowIndex--) {
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
      const timer = setTimeout(() => {
        setDroppingPiece(null)
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [droppingPiece])

  return (
    <div className="relative w-full max-w-[632px] mx-auto aspect-[632/594]">
      <div className="absolute inset-0 bg-purple rounded-[40px]" />

      <div className="absolute inset-0 z-10 pointer-events-none">
        <Image
          src={BlackBoardLayer}
          alt="Black Layer"
          className="w-full h-full object-cover"
        />
      </div>

      <div
        className="absolute inset-0 z-20 grid grid-cols-7"
        style={{
          top: '3%',
          bottom: '10%',
          left: '1.5%',
          right: '1.5%',
        }}
      >
        {Array.from({ length: columns }).map((_, colIndex) => (
          <div
            key={`col-${colIndex}`}
            className="relative h-full"
            onClick={() => handleColumnClick(colIndex)}
            onMouseEnter={() => setHoveredCol(colIndex)}
            onMouseLeave={() => setHoveredCol(null)}
          >
            {/* Container dos slots com padding e gap em porcentagem */}
            <div
              className="absolute top-0 left-0 right-0 h-full flex flex-col"
              style={{
                paddingLeft: '4%',
                paddingRight: '4%',
                gap: '2%', // Espaçamento vertical relativo
              }}
            >
              {Array.from({ length: rows }).map((_, rowIndex) => (
                <div
                  key={`slot-${colIndex}-${rowIndex}`}
                  className="relative flex-1"
                >
                  {(board[rowIndex][colIndex] ||
                    (droppingPiece?.col === colIndex &&
                      droppingPiece?.row === rowIndex)) && (
                    <div
                      className={`
                    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    w-[95%] h-[95%]
                    bg-contain bg-no-repeat bg-center
                    ${
                      droppingPiece?.col === colIndex &&
                      droppingPiece?.row === rowIndex
                        ? 'animate-drop'
                        : ''
                    }
                  `}
                      style={{
                        backgroundImage: `url(${
                          (board[rowIndex][colIndex] ||
                            droppingPiece?.player) === '1'
                            ? CounterRed.src
                            : CounterYellow.src
                        })`,
                        ...(droppingPiece?.col === colIndex &&
                          droppingPiece?.row === rowIndex && {
                            transform: 'translate(-50%, -500%)',
                            animation:
                              'drop 0.6s cubic-bezier(0.66, 0, 0.34, 1) forwards',
                          }),
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

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

      {/* Setas do topo */}
      <div className="hidden md:block absolute -top-6 left-0 right-0 z-40">
        <div className="grid grid-cols-7">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div key={`arrow-${colIndex}`} className="flex justify-center">
              {hoveredCol === colIndex && (
                <Image
                  src={PlayOneArrow}
                  alt="Player One Arrow"
                  className="w-[38px] h-[36px]"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Status do jogo */}
      <div className="shadow-[0_9px_0_0_black] flex flex-col text-center items-center justify-center w-[13rem] md:w-[18rem] bg-white p-3 py-2 border-2 border-black rounded-[1.2rem] absolute -bottom-[6rem] md:-bottom-[7rem] left-1/2 transform -translate-x-1/2 z-40">
        <p className="text-xs text-black font-bold">
          {currentPlayer === '1' ? "PLAYER 1'S TURN" : "PLAYER 2'S TURN"}
        </p>
        <h3 className="text-md md:text-lg text-black font-bold">READY?</h3>

        <button className="mt-1 text-center text-xs text-white font-bold rounded-2xl md:w-[7.5rem] w-[6rem] bg-purple-500 flex items-center justify-center px-3 py-2 border-none">
          PLAY
        </button>
      </div>

      <style jsx global>{`
        @keyframes drop {
          to {
            transform: translate(-50%, -50%);
          }
        }
      `}</style>
    </div>
  )
}
