import { Difficulty } from '@/types/difficulty'
import * as Dialog from '@radix-ui/react-dialog'

interface Props {
  onClose: () => void
  setDifficulty: (difficulty: Difficulty) => void
  onStartGame: () => void
}

export function DifficultyModal({
  onClose,
  setDifficulty,
  onStartGame,
}: Props) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay
        className="fixed inset-0 z-[990] bg-black bg-opacity-50"
        onClick={onClose}
      />

      <Dialog.Content className="fixed z-[999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] bg-purple-300 rounded-lg shadow-lg p-6 md:w-[480px] md:p-8">
        <Dialog.Title className="text-center text-md font-bold text-white mb-2">
          SELECT DIFFICULTY
        </Dialog.Title>

        <Dialog.Description className="flex flex-col w-full mt-6">
          <ul className="text-md  font-bold text-center flex flex-col w-full gap-3">
            {(['easy', 'normal', 'hard'] as Difficulty[]).map((level) => {
              const isMedium = level === 'normal'

              const hoverWidthClass = isMedium
                ? 'hover:after:w-[100px]'
                : 'hover:after:w-[70px]'

              const hoverTextColorClass =
                level === 'easy'
                  ? 'hover:text-white'
                  : level === 'normal'
                  ? 'hover:text-yellow'
                  : 'hover:text-pink'

              const hoverAfterBgColor =
                level === 'easy'
                  ? 'after:bg-white'
                  : level === 'normal'
                  ? 'after:bg-yellow'
                  : 'after:bg-pink'

              return (
                <li
                  key={level}
                  onClick={() => {
                    setDifficulty(level)
                    onStartGame()
                  }}
                  className={`relative cursor-pointer uppercase text-gray-200 transition-all duration-200
        after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[3px] 
        after:bg-white after:transition-all after:duration-500 after:transform after:-translate-x-1/2 
        hover:after:w-auto ${hoverAfterBgColor} ${hoverWidthClass} ${hoverTextColorClass}`}
                >
                  {level}
                </li>
              )
            })}
          </ul>
        </Dialog.Description>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
