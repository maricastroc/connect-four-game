import { Cell } from '@/types/cell'
import { Difficulty } from '@/types/difficulty'
import { COLUMNS, ROWS } from '@/utils/constants'

export function getBestMove(
  board: Cell[][],
  difficulty: Difficulty,
): number | null {
  const availableCols = board[0]
    .map((_, colIndex) => colIndex)
    .filter((col) => board[0][col] === null)

  if (availableCols.length === 0) return null

  if (difficulty === 'easy') {
    return availableCols[Math.floor(Math.random() * availableCols.length)]
  }

  const isWinningMove = (player: '1' | '2', col: number): boolean => {
    const testBoard = simulateMove(board, col, player)
    return checkWin(testBoard, player)
  }

  if (difficulty === 'medium') {
    for (const col of availableCols) {
      if (isWinningMove('2', col)) return col
      if (isWinningMove('1', col)) return col
    }
  }

  if (difficulty === 'hard') {
    for (const col of availableCols) {
      if (isWinningMove('2', col)) return col
    }
    for (const col of availableCols) {
      if (isWinningMove('1', col)) return col
    }
    const center = Math.floor(COLUMNS / 2)
    return availableCols.sort(
      (a, b) => Math.abs(a - center) - Math.abs(b - center),
    )[0]
  }

  return availableCols[0]
}

function simulateMove(
  board: Cell[][],
  col: number,
  player: '1' | '2',
): Cell[][] {
  const newBoard = board.map((row) => [...row])
  for (let row = ROWS - 1; row >= 0; row--) {
    if (!newBoard[row][col]) {
      newBoard[row][col] = player
      break
    }
  }
  return newBoard
}

function checkWin(board: Cell[][], player: '1' | '2'): boolean {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLUMNS; col++) {
      if (
        checkDirection(board, row, col, 0, 1, player) || // horizontal
        checkDirection(board, row, col, 1, 0, player) || // vertical
        checkDirection(board, row, col, 1, 1, player) || // diagonal \
        checkDirection(board, row, col, 1, -1, player) // diagonal /
      ) {
        return true
      }
    }
  }
  return false
}

function checkDirection(
  board: Cell[][],
  row: number,
  col: number,
  dRow: number,
  dCol: number,
  player: '1' | '2',
): boolean {
  for (let i = 0; i < 4; i++) {
    const r = row + dRow * i
    const c = col + dCol * i
    if (r < 0 || r >= ROWS || c < 0 || c >= COLUMNS || board[r][c] !== player) {
      return false
    }
  }
  return true
}
