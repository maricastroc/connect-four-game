import Image from 'next/image'
import PlayerVsPlayer from '../../public/assets/images/player-vs-player.svg'
import PlayerVsCpu from '../../public/assets/images/player-vs-cpu.svg'
import { ButtonHTMLAttributes, JSX } from 'react'

type OptionType = 'player-vs-player' | 'rules' | 'player-vs-cpu'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: OptionType
}

const optionsMap: Record<
  OptionType,
  { text: string; icon: JSX.Element | null; bgColor: string; textColor: string }
> = {
  'player-vs-player': {
    text: 'PLAY VS PLAYER',
    icon: <Image src={PlayerVsPlayer} alt="Player vs Player" />,
    bgColor: 'bg-yellow',
    textColor: 'text-black',
  },
  'player-vs-cpu': {
    text: 'PLAY VS CPU',
    icon: <Image src={PlayerVsCpu} alt="Player vs CPU" />,
    bgColor: 'bg-pink',
    textColor: 'text-white',
  },
  rules: {
    text: 'GAME RULES',
    icon: null,
    bgColor: 'bg-white',
    textColor: 'text-black',
  },
}

export const OptionsButton = ({ variant }: Props) => {
  const { text, icon, bgColor, textColor } = optionsMap[variant]

  return (
    <button
      className={`transition-all hover:shadow-[0_9px_0_0_#5C2DD5] hover:border-purple-500 flex items-center justify-between w-full ${bgColor} border-[3.5px] border-black px-5 h-[5.5rem] rounded-[1.25rem] shadow-[0_9px_0_0_black] active:translate-y-[4px] active:shadow-none transition-all`}
    >
      <p className={`text-md text-left mr-4 font-black ${textColor}`}>{text}</p>
      {icon}
    </button>
  )
}
