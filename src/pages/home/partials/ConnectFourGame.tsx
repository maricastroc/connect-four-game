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
import { GameModal } from '@/components/GameModal'

type Props = {
  mode: Mode
  difficulty: Difficulty
  onExit: () => void
}

export const ConnectFourGame = ({ mode, difficulty, onExit }: Props) => {
  const [board, setBoard] = useState<Cell[][]>(initializeBoard())

  const [score, setScore] = useState<Score>({ '1': 0, '2': 0 })

  const [hasGameStarted, setHasGameStarted] = useState(false)

  const [winner, setWinner] = useState<Player | undefined>()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [isGamePaused, setIsGamePaused] = useState(false)

  const [startingPlayer, setStartingPlayer] = useState<'1' | '2'>('1')

  const [currentPlayer, setCurrentPlayer] = useState<'1' | '2'>('1')

  const restartBoard = () => {
    setBoard(initializeBoard())
    setWinner(undefined)
    setHasGameStarted(false)
    setScore({ '1': 0, '2': 0 })
    setCurrentPlayer(startingPlayer)
  }

  type ModalOption = 'continue game' | 'restart' | 'quit game'

  const modalOptionsStyleMap: Record<
    ModalOption,
    { bgColor: string; textColor: string; onClick: () => void }
  > = {
    'continue game': {
      bgColor: 'bg-white',
      textColor: 'text-black',
      onClick: () => setIsModalOpen(false),
    },
    restart: {
      bgColor: 'bg-white',
      textColor: 'text-black',
      onClick: () => {
        restartBoard()
        setIsModalOpen(false)
      },
    },
    'quit game': {
      bgColor: 'bg-pink',
      textColor: 'text-white',
      onClick: () => {
        onExit()
        setIsModalOpen(false)
      },
    },
  }

  const modalButtons = (
    ['continue game', 'restart', 'quit game'] as ModalOption[]
  ).map((option) => ({
    key: option,
    text: option,
    bgColor: modalOptionsStyleMap[option].bgColor,
    textColor: modalOptionsStyleMap[option].textColor,
    onClick: () => {
      modalOptionsStyleMap[option].onClick()
      setIsGamePaused(false)
    },
  }))

  return (
    <div className="relative w-full min-h-screen">
      <div className="absolute inset-0 z-0">
        <div className="h-[75%] md:h-[80%] lg:h-[75%] bg-purple-300" />
        <div className="h-[25%] md:h-[20%] lg:h-[25%] bg-purple-500 rounded-tl-[3rem] rounded-tr-[3rem]" />
      </div>

      {isModalOpen && (
        <GameModal
          isVisible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="PAUSE"
          buttons={modalButtons}
        />
      )}

      <div className="relative z-10 px-4 py-10 flex flex-col items-center justify-start w-full h-full">
        <BoardHeader
          openOptionsModal={() => {
            setIsModalOpen(true)
            setIsGamePaused(true)
          }}
          restartBoard={restartBoard}
        />

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
            isGamePaused={isGamePaused}
            currentPlayer={currentPlayer}
            startingPlayer={startingPlayer}
            setCurrentPlayer={(player) => setCurrentPlayer(player)}
            setStartingPlayer={(player) => setStartingPlayer(player)}
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
