import { Cell } from '@/types/cell'
import { COLUMNS, ROWS } from './constants'

export function initializeBoard(): Cell[][] {
  return Array(ROWS)
    .fill(null)
    .map(() => Array(COLUMNS).fill(null))
}
