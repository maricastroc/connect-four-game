import { OptionsButton } from '@/components/OptionsButton'
import Logo from '../../../../public/assets/images/logo.svg'
import Image from 'next/image'
import { Difficulty } from '@/types/difficulty'
import { useState } from 'react'
import { GameModal } from '@/components/GameModal'
import { AnimatePresence } from 'framer-motion'

type Props = {
  onRules: () => void
  onStartGame: (mode?: 'pvp' | 'pvc' | undefined) => void
  setDifficulty: (difficulty: Difficulty) => void
}

export const OptionsCard = ({ setDifficulty, onRules, onStartGame }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const difficultyStyleMap = {
    easy: { bgColor: 'bg-white', textColor: 'text-black' },
    normal: { bgColor: 'bg-yellow', textColor: 'text-black' },
    hard: { bgColor: 'bg-pink', textColor: 'text-white' },
  } as const

  const buttons = (['easy', 'normal', 'hard'] as const).map((level) => ({
    key: level,
    text: level,
    bgColor: difficultyStyleMap[level].bgColor,
    textColor: difficultyStyleMap[level].textColor,
    onClick: () => {
      setDifficulty(level)
      onStartGame('pvc')
      setIsModalOpen(false)
    },
  }))

  return (
    <div className="bg-purple-300 md:bg-purple-500 flex flex-col items-center justify-center w-full min-h-screen">
      <div className="md:shadow-[0_9.5px_0_0_black] md:rounded-[2.5rem] md:border-[3px] md:border-black flex flex-col md:p-10 md:pt-[4.375rem] p-5 bg-purple-300 items-center justify-center gap-16 w-full max-w-[30rem]">
        <Image src={Logo} alt="App Logo" />

        <div className="flex flex-col gap-6 w-full">
          <OptionsButton
            variant="player-vs-cpu"
            text="PLAY VS CPU"
            bgColor="bg-pink"
            textColor="text-white"
            onClick={() => setIsModalOpen(true)}
          />
          <AnimatePresence>
            {isModalOpen && (
              <GameModal
                isVisible={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="SET LEVEL"
                buttons={buttons}
              />
            )}
          </AnimatePresence>
          <OptionsButton
            variant="player-vs-player"
            text="PLAY VS PLAYER"
            bgColor="bg-yellow"
            textColor="text-black"
            onClick={() => onStartGame('pvp')}
          />
          <OptionsButton
            bgColor="bg-white"
            textColor="text-black"
            text="GAME RULES"
            variant="rules"
            onClick={onRules}
          />
        </div>
      </div>
    </div>
  )
}
