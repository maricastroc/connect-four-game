import { OptionsButton } from '@/components/OptionsButton'
import Logo from '../../../../public/assets/images/logo.svg'
import Image from 'next/image'
import { Difficulty } from '@/types/difficulty'
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import { DifficultyModal } from '@/components/DifficutyModal'

type Props = {
  onRules: () => void
  onStartGame: (mode?: 'pvp' | 'pvc' | undefined) => void
  setDifficulty: (difficulty: Difficulty) => void
}

export const OptionsCard = ({ setDifficulty, onRules, onStartGame }: Props) => {
  const [isDifficultyModalOpen, setIsDifficultyModalOpen] = useState(false)

  return (
    <div className="bg-purple-300 md:bg-purple-500 flex flex-col items-center justify-center w-full min-h-screen">
      <div className="md:shadow-[0_9.5px_0_0_black] md:rounded-[2.5rem] md:border-[3px] md:border-black flex flex-col md:p-10 md:pt-[4.375rem] p-5 bg-purple-300 items-center justify-center gap-16 w-full max-w-[30rem]">
        <Image src={Logo} alt="App Logo" />

        <div className="flex flex-col gap-6 w-full">
          <Dialog.Root open={isDifficultyModalOpen}>
            <Dialog.Trigger asChild>
              <OptionsButton
                variant="player-vs-cpu"
                onClick={() => setIsDifficultyModalOpen(true)}
              />
            </Dialog.Trigger>
            <DifficultyModal
              setDifficulty={(value) => setDifficulty(value)}
              onStartGame={() => onStartGame('pvc')}
              onClose={() => setIsDifficultyModalOpen(false)}
            />
          </Dialog.Root>
          <OptionsButton
            variant="player-vs-player"
            onClick={() => onStartGame('pvp')}
          />
          <OptionsButton variant="rules" onClick={onRules} />
        </div>
      </div>
    </div>
  )
}
