import { Cell } from '@/types/cell'
import CounterRed from '../../public/assets/images/counter-red-large.svg'
import CounterYellow from '../../public/assets/images/counter-yellow-large.svg'
import { Player } from '@/types/player'

type GameSlotProps = {
  cell: Cell
  isDropping: boolean
  player?: Player
}

export const GameSlot = ({ cell, isDropping, player }: GameSlotProps) => {
  return (
    <div className="relative flex-1">
      {(cell || isDropping) && (
        <div
          className={`
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[95%] h-[95%]
          bg-contain bg-no-repeat bg-center
          ${isDropping ? 'animate-drop-with-bounces' : ''}
        `}
          style={{
            backgroundImage: `url(${
              (isDropping ? player : cell) === '1'
                ? CounterRed.src
                : CounterYellow.src
            })`,
          }}
        />
      )}
    </div>
  )
}
