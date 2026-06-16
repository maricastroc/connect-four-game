import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react'
import { Cell } from '@/types/cell'
import { Player } from '@/types/player'
import { Score } from '@/types/score'
import { Mode } from '@/types/mode'
import { Difficulty } from '@/types/difficulty'
import { initializeBoard } from '@/utils/initializeBoard'

type GameContextValue = {
  mode: Mode
  difficulty: Difficulty
  board: Cell[][]
  score: Score
  currentPlayer: Player
  startingPlayer: Player
  winner: Player | undefined
  winningCells: [number, number][]
  hasGameStarted: boolean
  isGamePaused: boolean
  isModalOpen: boolean
  setBoard: (board: Cell[][]) => void
  setScore: React.Dispatch<React.SetStateAction<Score>>
  setCurrentPlayer: (player: Player) => void
  setStartingPlayer: (player: Player) => void
  setWinner: (player: Player | undefined) => void
  setWinningCells: (cells: [number, number][]) => void
  setHasGameStarted: (value: boolean) => void
  setIsGamePaused: (value: boolean) => void
  setIsModalOpen: (value: boolean) => void
  restartBoard: () => void
  onExit: () => void
}

const GameContext = createContext<GameContextValue | null>(null)

type Props = {
  mode: Mode
  difficulty: Difficulty
  onExit: () => void
  children: ReactNode
}

export const GameProvider = ({ mode, difficulty, onExit, children }: Props) => {
  const [board, setBoard] = useState<Cell[][]>(initializeBoard())
  const [score, setScore] = useState<Score>({ '1': 0, '2': 0 })
  const [hasGameStarted, setHasGameStarted] = useState(false)
  const [winner, setWinner] = useState<Player | undefined>()
  const [winningCells, setWinningCells] = useState<[number, number][]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isGamePaused, setIsGamePaused] = useState(false)
  const [startingPlayer, setStartingPlayer] = useState<Player>('1')
  const [currentPlayer, setCurrentPlayer] = useState<Player>('1')

  const restartBoard = useCallback(() => {
    setBoard(initializeBoard())
    setWinner(undefined)
    setWinningCells([])
    setHasGameStarted(false)
    setScore({ '1': 0, '2': 0 })
    setCurrentPlayer(startingPlayer)
  }, [startingPlayer])

  return (
    <GameContext.Provider
      value={{
        mode,
        difficulty,
        board,
        score,
        currentPlayer,
        startingPlayer,
        winner,
        winningCells,
        hasGameStarted,
        isGamePaused,
        isModalOpen,
        setBoard,
        setScore,
        setCurrentPlayer,
        setStartingPlayer,
        setWinner,
        setWinningCells,
        setHasGameStarted,
        setIsGamePaused,
        setIsModalOpen,
        restartBoard,
        onExit,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export const useGame = (): GameContextValue => {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame deve ser usado dentro de GameProvider')
  return ctx
}
