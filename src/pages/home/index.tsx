import { NextSeo } from 'next-seo'
import { RulesCard } from './partials/RulesCard'
import { useState } from 'react'
import { OptionsCard } from './partials/OptionsCard'
import { AnimatePresence, motion } from 'framer-motion'

export default function Home() {
  const [showRulesCard, setShowRulesCard] = useState(false)

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

      <div className="fixed inset-0 bg-purple-300 md:bg-purple-500 z-0 overflow-hidden" />

      <AnimatePresence mode="wait">
        {showRulesCard ? (
          <motion.div
            key="rules"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{
              y: '100%',
              opacity: 0,
              transition: { duration: 0.4, ease: 'easeInOut' },
            }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed inset-0 z-10"
          >
            <RulesCard onClick={() => setShowRulesCard(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{
              y: -100,
              opacity: 0,
              transition: { duration: 0.4, ease: 'easeInOut' },
            }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed inset-0 z-10"
          >
            <OptionsCard onClick={() => setShowRulesCard(true)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
