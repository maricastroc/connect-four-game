import { Cell } from '@/types/cell'
import { COLUMNS, ROWS } from './constants'

export function checkWin(
  board: Cell[][],
  player: '1' | '2',
): [boolean, [number, number][]] {
  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ]

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLUMNS; col++) {
      if (board[row][col] !== player) continue

      for (const [dx, dy] of directions) {
        const positions: [number, number][] = [[row, col]]

        for (let i = 1; i < 4; i++) {
          const newRow = row + dx * i
          const newCol = col + dy * i

          if (
            newRow >= 0 &&
            newRow < ROWS &&
            newCol >= 0 &&
            newCol < COLUMNS &&
            board[newRow][newCol] === player
          ) {
            positions.push([newRow, newCol])
          } else {
            break
          }
        }

        if (positions.length >= 4) return [true, positions]
      }
    }
  }

  return [false, []]
}
