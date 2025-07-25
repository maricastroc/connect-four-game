import Image from 'next/image'
import PlayerVsPlayer from '../../public/assets/images/player-vs-player.svg'
import PlayerVsCpu from '../../public/assets/images/player-vs-cpu.svg'
import { ButtonHTMLAttributes, JSX } from 'react'

type OptionType = 'player-vs-player' | 'rules' | 'player-vs-cpu' | 'default'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: OptionType
  text: string
  bgColor: string
  textColor: string
}

const optionsMap: Record<OptionType, { icon: JSX.Element | null }> = {
  'player-vs-player': {
    icon: <Image src={PlayerVsPlayer} alt="Player vs Player" />,
  },
  'player-vs-cpu': {
    icon: <Image src={PlayerVsCpu} alt="Player vs CPU" />,
  },
  rules: {
    icon: null,
  },
  default: {
    icon: null,
  },
}

export const OptionsButton = ({
  variant = 'default',
  text,
  bgColor,
  textColor,
  ...rest
}: Props) => {
  const { icon } = optionsMap[variant]

  return (
    <button
      className={`transition-all hover:shadow-[0_9px_0_0_#5C2DD5] hover:border-purple-500 flex items-center justify-between w-full ${bgColor} border-[3.5px] border-black px-5 h-[5.5rem] rounded-[1.25rem] shadow-[0_9px_0_0_black] active:translate-y-[4px] active:shadow-none transition-all`}
      {...rest}
    >
      <p className={`text-md uppercase text-left mr-4 font-black ${textColor}`}>
        {text}
      </p>
      {icon}
    </button>
  )
}
