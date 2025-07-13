import { Board } from '@/components/Board'
import { PlayerCard } from '@/components/PlayerCard'
import { BoardHeader } from '@/components/BoardHeader'
import { Difficulty } from '@/types/difficulty'
import { useState } from 'react'
import { Score } from '@/types/score'
import { Mode } from '@/types/mode'
import { Cell } from '@/types/cell'
import { initializeBoard } from '@/utils/initializeBoard'
import { Player } from '@/types/player'

type Props = {
  mode: Mode
  difficulty: Difficulty
  onExit: () => void
}

export const ConnectFourGame = ({ mode, difficulty }: Props) => {
  const [board, setBoard] = useState<Cell[][]>(initializeBoard())

  const [score, setScore] = useState<Score>({ '1': 0, '2': 0 })

  const [hasGameStarted, setHasGameStarted] = useState(false)

  const [winner, setWinner] = useState<Player | undefined>()

  const restartBoard = () => {
    setBoard(initializeBoard())
    setWinner(undefined)
    setHasGameStarted(false)
    setScore({ '1': 0, '2': 0 })
  }

  return (
    <div className="relative w-full min-h-screen">
      <div className="absolute inset-0 z-0">
        <div className="h-[75%] md:h-[80%] lg:h-[75%] bg-purple-300" />
        <div className="h-[25%] md:h-[20%] lg:h-[25%] bg-purple-500 rounded-tl-[3rem] rounded-tr-[3rem]" />
      </div>

      <div className="relative z-10 px-4 py-10 flex flex-col items-center justify-start w-full h-full">
        <BoardHeader restartBoard={restartBoard} />

        <div className="flex flex-col lg:flex-row lg:items-center items-center justify-start w-full lg:max-w-[70vw] mx-auto lg:gap-10 pb-32">
          <div className="lg:hidden gap-3 flex items-center justify-between w-[88%] md:min-w-[500px] md:max-w-[40rem] max-w-[30rem] mb-10">
            <PlayerCard
              type="player_one"
              name={mode === 'pvp' ? 'PLAYER 1' : 'YOU'}
              score={score['1']}
            />
            <PlayerCard
              type={mode === 'pvp' ? 'player_two' : 'cpu'}
              name={mode === 'pvp' ? 'PLAYER 2' : 'CPU'}
              score={score['2']}
            />
          </div>

          <PlayerCard
            className="hidden lg:flex min-w-[8rem]"
            type="player_one"
            name={mode === 'pvp' ? 'PLAYER 1' : 'YOU'}
            score={score['1']}
          />
          <Board
            mode={mode}
            difficulty={difficulty}
            score={score}
            setScore={setScore}
            board={board}
            setBoard={(value) => setBoard(value)}
            winner={winner}
            setWinner={(winner) => setWinner(winner)}
            hasGameStarted={hasGameStarted}
            setHasGameStarted={(value) => setHasGameStarted(value)}
          />
          <PlayerCard
            className="hidden lg:flex min-w-[8rem]"
            type={mode === 'pvp' ? 'player_two' : 'cpu'}
            name={mode === 'pvp' ? 'PLAYER 2' : 'CPU'}
            score={score['2']}
          />
        </div>
      </div>
    </div>
  )
}
