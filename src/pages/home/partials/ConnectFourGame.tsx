import { Board } from '@/components/Board'
import { PlayerCard } from '@/components/PlayerCard'
import { BoardHeader } from '@/components/BoardHeader'

type Props = {
  mode?: 'pvp' | 'pvc' | undefined
  onExit: () => void
}

export const ConnectFourGame = ({ mode }: Props) => {
  return (
    <div className="bg-purple-300 px-4 py-10 flex flex-col items-center justify-start w-full min-h-screen">
      <BoardHeader />

      <div className="flex flex-col lg:flex-row lg:items-center items-center justify-start w-full lg:max-w-[70%] mx-auto lg:gap-10 pb-24 md:pb-40">
        <div className="lg:hidden gap-3 flex items-center justify-between w-[88%] max-w-[30rem] mb-10">
          <PlayerCard
            type="player_one"
            name={mode === 'pvp' ? 'PLAYER 1' : 'YOU'}
            score={12}
          />
          <PlayerCard
            type={mode === 'pvp' ? 'player_two' : 'cpu'}
            name={mode === 'pvp' ? 'PLAYER 2' : 'CPU'}
            score={12}
          />
        </div>

        <PlayerCard
          className="hidden lg:flex"
          type="player_one"
          name={mode === 'pvp' ? 'PLAYER 1' : 'YOU'}
          score={12}
        />
        <Board />
        <PlayerCard
          className="hidden lg:flex"
          type={mode === 'pvp' ? 'player_two' : 'cpu'}
          name={mode === 'pvp' ? 'PLAYER 2' : 'CPU'}
          score={12}
        />
      </div>
    </div>
  )
}
