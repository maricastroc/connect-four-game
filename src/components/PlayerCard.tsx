import Image from 'next/image'
import PlayerOne from '../../public/assets/images/player-one.svg'
import PlayerTwo from '../../public/assets/images/player-two.svg'
import PlayerCpu from '../../public/assets/images/cpu.svg'

type Props = {
  type: 'player_one' | 'player_two' | 'cpu'
  name: string
  score: number
  className?: string
}

const icons = {
  player_one: PlayerOne,
  player_two: PlayerTwo,
  cpu: PlayerCpu,
}

export const PlayerCard = ({ type, name, score, className = '' }: Props) => {
  const icon = icons[type]

  return (
    <div
      className={`text-black relative w-full shadow-[0_9.5px_0_0_black] rounded-[1rem] bg-white border-[3px] border-black p-3 flex flex-col md:justify-between items-center justify-center ${className} ${
        type === 'player_one' ? 'md:flex-row' : 'md:flex-row-reverse'
      } lg:flex-col lg:max-w-[9rem] lg:pt-10`}
    >
      <p
        className={`text-xs md:text-sm font-bold ${
          type === 'player_one' ? 'md:ml-5 lg:ml-0' : 'md:mr-5 lg:mr-0'
        }`}
      >
        {name}
      </p>
      <span className="text-md md:text-lg font-bold">{score}</span>

      <div
        className={`
          absolute 
          ${type === 'player_one' ? 'left-[-2rem]' : 'right-[-2rem]'} 
          top-1/2 -translate-y-1/2

          lg:left-1/2 lg:right-auto lg:top-[-2rem] lg:-translate-x-1/2 lg:translate-y-0
        `}
      >
        <Image src={icon} alt={name} />
      </div>
    </div>
  )
}
