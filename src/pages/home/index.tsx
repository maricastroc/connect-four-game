import { NextSeo } from 'next-seo'
import { RulesCard } from './partials/RulesCard'
import { useState } from 'react'
import { OptionsCard } from './partials/OptionsCard'
import { AnimatePresence, motion } from 'framer-motion'
import { ConnectFourGame } from './partials/ConnectFourGame'
import { Difficulty } from '@/types/difficulty'
import { Mode } from '@/types/mode'

export default function Home() {
  const [currentView, setCurrentView] = useState<'menu' | 'rules' | 'game'>(
    'menu',
  )
  const [gameMode, setGameMode] = useState<Mode>()

  const [difficulty, setDifficulty] = useState<Difficulty>('hard')

  return (
    <>
      <NextSeo
        title="Home | Connect Four Game"
        additionalMetaTags={[
          {
            name: 'viewport',
            content:
              'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
          },
        ]}
      />

      <div
        className={`fixed ${
          currentView === 'menu' && 'md:bg-purple-500'
        } inset-0 bg-purple-300  z-0`}
      />

      <AnimatePresence mode="wait">
        {currentView === 'rules' ? (
          <motion.div
            key="rules"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.4, ease: [0.42, 0, 0.58, 1] }}
            className="fixed inset-0 z-10"
          >
            <RulesCard onBack={() => setCurrentView('menu')} />
          </motion.div>
        ) : currentView === 'game' ? (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.42, 0, 0.58, 1] }}
            className="absolute inset-0 z-10 overflow-y-auto 
              md:[&::-webkit-scrollbar]:w-2
              md:dark:[&::-webkit-scrollbar-track]:bg-[#7945FF]
              md:dark:[&::-webkit-scrollbar-thumb]:bg-[#8e71f4]
              [&::-webkit-scrollbar]:hidden md:[&::-webkit-scrollbar]:block"
          >
            <ConnectFourGame
              mode={gameMode}
              difficulty={difficulty}
              onExit={() => setCurrentView('menu')}
            />
          </motion.div>
        ) : (
          <motion.div
            key="menu"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.4, ease: [0.42, 0, 0.58, 1] }}
            className="fixed inset-0 z-10"
          >
            <OptionsCard
              setDifficulty={(value: Difficulty) => setDifficulty(value)}
              onRules={() => setCurrentView('rules')}
              onStartGame={(mode) => {
                setGameMode(mode)
                setCurrentView('game')
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
