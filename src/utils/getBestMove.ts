import { Cell } from '@/types/cell'
import { Difficulty } from '@/types/difficulty'
import { COLUMNS, ROWS } from '@/utils/constants'

// ================== FUNÇÕES AUXILIARES BÁSICAS ==================
function getAvailableColumns(board: Cell[][]): number[] {
  return board[0].map((_, col) => col).filter((col) => board[0][col] === null)
}

function getNextEmptyRow(board: Cell[][], col: number): number {
  for (let row = ROWS - 1; row >= 0; row--) {
    if (!board[row][col]) return row
  }
  return -1
}

function simulateMove(
  board: Cell[][],
  col: number,
  player: '1' | '2',
): Cell[][] {
  const newBoard = board.map((row) => [...row])
  const row = getNextEmptyRow(newBoard, col)
  if (row !== -1) newBoard[row][col] = player
  return newBoard
}

function checkWin(board: Cell[][], player: '1' | '2'): boolean {
  // Verificação otimizada de vitória
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLUMNS; col++) {
      if (board[row][col] !== player) continue

      // Horizontal
      if (
        col <= COLUMNS - 4 &&
        board[row][col + 1] === player &&
        board[row][col + 2] === player &&
        board[row][col + 3] === player
      )
        return true

      // Vertical
      if (
        row <= ROWS - 4 &&
        board[row + 1][col] === player &&
        board[row + 2][col] === player &&
        board[row + 3][col] === player
      )
        return true

      // Diagonal \
      if (
        row <= ROWS - 4 &&
        col <= COLUMNS - 4 &&
        board[row + 1][col + 1] === player &&
        board[row + 2][col + 2] === player &&
        board[row + 3][col + 3] === player
      )
        return true

      // Diagonal /
      if (
        row <= ROWS - 4 &&
        col >= 3 &&
        board[row + 1][col - 1] === player &&
        board[row + 2][col - 2] === player &&
        board[row + 3][col - 3] === player
      )
        return true
    }
  }
  return false
}

// ================== FUNÇÕES PARA DIFICULDADE HARD ==================
function evaluatePosition(board: Cell[][], player: '1' | '2'): number {
  const opponent = player === '1' ? '2' : '1'
  let score = 0
  const centerCol = Math.floor(COLUMNS / 2)

  // Avalia todas as possíveis sequências de 4 células
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLUMNS; col++) {
      // Horizontal
      if (col <= COLUMNS - 4) {
        score += evaluateSequence(
          [
            board[row][col],
            board[row][col + 1],
            board[row][col + 2],
            board[row][col + 3],
          ],
          player,
          opponent,
        )
      }

      // Vertical
      if (row <= ROWS - 4) {
        score += evaluateSequence(
          [
            board[row][col],
            board[row + 1][col],
            board[row + 2][col],
            board[row + 3][col],
          ],
          player,
          opponent,
        )
      }

      // Diagonal \
      if (row <= ROWS - 4 && col <= COLUMNS - 4) {
        score += evaluateSequence(
          [
            board[row][col],
            board[row + 1][col + 1],
            board[row + 2][col + 2],
            board[row + 3][col + 3],
          ],
          player,
          opponent,
        )
      }

      // Diagonal /
      if (row <= ROWS - 4 && col >= 3) {
        score += evaluateSequence(
          [
            board[row][col],
            board[row + 1][col - 1],
            board[row + 2][col - 2],
            board[row + 3][col - 3],
          ],
          player,
          opponent,
        )
      }
    }
  }

  // Bônus para peças no centro
  for (let row = 0; row < ROWS; row++) {
    if (board[row][centerCol] === player) score += 10
    else if (board[row][centerCol] === opponent) score -= 10
  }

  return score
}

function evaluateSequence(
  sequence: Cell[],
  player: '1' | '2',
  opponent: '1' | '2',
): number {
  let playerCount = 0
  let opponentCount = 0
  let emptyCount = 0

  for (const cell of sequence) {
    if (cell === player) playerCount++
    else if (cell === opponent) opponentCount++
    else emptyCount++
  }

  // Sequências ofensivas
  if (playerCount === 4) return 100000 // Vitória
  if (playerCount === 3 && emptyCount === 1) return 1000
  if (playerCount === 2 && emptyCount === 2) return 100
  if (playerCount === 1 && emptyCount === 3) return 10

  // Sequências defensivas
  if (opponentCount === 3 && emptyCount === 1) return 900 // Bloqueio crítico
  if (opponentCount === 2 && emptyCount === 2) return 90
  if (opponentCount === 1 && emptyCount === 3) return 9

  return 0
}

function minimax(
  board: Cell[][],
  depth: number,
  isMaximizing: boolean,
  alpha: number,
  beta: number,
  player: '1' | '2',
): [number | null, number] {
  const opponent = player === '1' ? '2' : '1'
  const availableCols = getAvailableColumns(board)

  // Condições de término
  if (checkWin(board, player)) return [null, 1000000 + depth] // Vitória com bônus por ser mais rápida
  if (checkWin(board, opponent)) return [null, -1000000 - depth]
  if (availableCols.length === 0) return [null, 0] // Empate
  if (depth === 0) return [null, evaluatePosition(board, player)]

  // Ordena colunas pelo centro para otimização
  const center = Math.floor(COLUMNS / 2)
  const orderedCols = [...availableCols].sort(
    (a, b) => Math.abs(a - center) - Math.abs(b - center),
  )

  let bestCol = orderedCols[0]
  let bestScore = isMaximizing ? -Infinity : Infinity

  for (const col of orderedCols) {
    const row = getNextEmptyRow(board, col)
    if (row === -1) continue

    const newBoard = simulateMove(board, col, isMaximizing ? player : opponent)
    const [, score] = minimax(
      newBoard,
      depth - 1,
      !isMaximizing,
      alpha,
      beta,
      player,
    )

    if (isMaximizing) {
      if (score > bestScore) {
        bestScore = score
        bestCol = col
      }
      alpha = Math.max(alpha, score)
    } else {
      if (score < bestScore) {
        bestScore = score
        bestCol = col
      }
      beta = Math.min(beta, score)
    }

    if (beta <= alpha) break // Poda alfa-beta
  }

  return [bestCol, bestScore]
}

// ================== FUNÇÃO PRINCIPAL ==================
export function getBestMove(
  board: Cell[][],
  difficulty: Difficulty,
): number | null {
  const availableCols = getAvailableColumns(board)
  if (availableCols.length === 0) return null

  // Verificação de jogadas imediatas (para todas as dificuldades)
  for (const col of availableCols) {
    const row = getNextEmptyRow(board, col)
    if (row === -1) continue

    // 1. Primeiro verifica se pode ganhar
    const winBoard = simulateMove(board, col, '2')
    if (checkWin(winBoard, '2')) return col

    // 2. Depois verifica se precisa bloquear
    const blockBoard = simulateMove(board, col, '1')
    if (checkWin(blockBoard, '1')) return col
  }

  // Comportamento por dificuldade
  switch (difficulty) {
    case 'easy': {
      return availableCols[Math.floor(Math.random() * availableCols.length)]
    }

    case 'normal': {
      // Minimax com profundidade reduzida e estratégia simplificada
      const center = Math.floor(COLUMNS / 2)
      const centerCols = availableCols.filter(
        (col) => Math.abs(col - center) <= 1,
      )
      if (centerCols.length > 0) {
        return centerCols[Math.floor(Math.random() * centerCols.length)]
      }
      return availableCols[Math.floor(Math.random() * availableCols.length)]
    }

    case 'hard': {
      const [bestCol] = minimax(board, 5, true, -Infinity, Infinity, '2')
      return bestCol !== null ? bestCol : availableCols[0]
    }

    default:
      return availableCols[0]
  }
}
