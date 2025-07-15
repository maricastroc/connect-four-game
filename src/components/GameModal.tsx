import * as Dialog from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { OptionsButton } from './OptionsButton'

interface ModalButton {
  key: string
  text: string
  bgColor: string
  textColor: string
  onClick: () => void
}

interface Props {
  isVisible: boolean
  onClose: () => void
  title: string
  buttons: ModalButton[]
}

export function GameModal({ isVisible, onClose, title, buttons }: Props) {
  return (
    <Dialog.Root open>
      <Dialog.Portal>
        <AnimatePresence>
          {isVisible && (
            <>
              <Dialog.Overlay asChild forceMount>
                <motion.div
                  key="overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 z-[990] bg-black bg-opacity-60"
                  onClick={onClose}
                />
              </Dialog.Overlay>

              <Dialog.Content asChild forceMount>
                <motion.div
                  key="modal"
                  initial={{ opacity: 0, scale: 0.95, x: '-50%', y: '-50%' }}
                  animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
                  exit={{ opacity: 0, scale: 0.8, x: '-50%', y: '-40%' }}
                  transition={{ duration: 0.3 }}
                  className="fixed z-[999] border-[4px] shadow-[0_8px_0_0_black] border-black top-1/2 left-1/2 w-[90vw] bg-purple-300 rounded-[1.8rem] p-6 md:w-[480px] md:p-8"
                >
                  <Dialog.Title className="text-center text-lg font-bold text-white mb-2">
                    {title}
                  </Dialog.Title>
                  <div className="flex flex-col gap-6 mt-8 text-center font-bold">
                    {buttons.map(
                      ({ key, text, bgColor, textColor, onClick }) => (
                        <OptionsButton
                          key={key}
                          text={text}
                          bgColor={bgColor}
                          textColor={textColor}
                          onClick={onClick}
                        />
                      ),
                    )}
                  </div>
                </motion.div>
              </Dialog.Content>
            </>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
