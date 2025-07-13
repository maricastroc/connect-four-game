import { Player } from '@/types/player'
import { Button } from './Button'

type GameStatusProps = {
  currentPlayer: Player
}

export const GameStatus = ({ currentPlayer }: GameStatusProps) => {
  return (
    <div className="shadow-[0_9px_0_0_black] flex flex-col text-center items-center justify-center w-[13rem] sm:w-[18rem] bg-white p-3 py-2 border-2 border-black rounded-[1.2rem] absolute -bottom-[6rem] sm:-bottom-[7rem] left-1/2 transform -translate-x-1/2 z-40">
      <p className="text-xs text-black font-bold">
        {currentPlayer === '1' ? "PLAYER 1'S TURN" : "PLAYER 2'S TURN"}
      </p>
      <h3 className="text-md sm:text-lg text-black font-bold">READY?</h3>
      <Button label="PLAY" />
    </div>
  )
}
