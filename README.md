# Connect Four Game

A fully responsive Connect Four game built with Next.js, TypeScript, and Tailwind CSS.

<img width="3204" height="1722" alt="connect-four" src="https://github.com/user-attachments/assets/1fbcc70f-565b-457d-bb0f-f898f1e4015c" />

## Features

- Player vs Player and Player vs CPU modes
- Three CPU difficulty levels: Easy, Normal, and Hard
- Hard mode uses a **Minimax algorithm with Alpha-Beta pruning** for optimal play
- Drop animation when placing a piece
- 30-second turn timer — skips the turn if it runs out
- Win detection with visual highlight of the winning sequence
- Score tracking across rounds, with alternating starting player
- Fully responsive layout (mobile, tablet, desktop)
- Pause menu with continue, restart, and quit options

## Tech Stack

- [Next.js 15](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer-motion.com/) — drop animation and modal transitions
- [Radix UI](https://www.radix-ui.com/) — accessible dialog/modal

## Getting Started

```bash
cd app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── components/       # UI components (Board, GameGrid, GameStatus, etc.)
├── context/          # GameContext — global game state via React Context
├── pages/            # Next.js pages and page-level components
├── types/            # TypeScript type definitions
└── utils/            # Game logic (checkWin, getBestMove, initializeBoard)
```

## Architecture Highlights

Game state is managed through a single `GameContext`, avoiding prop drilling across the component tree. The `Board` component handles move logic and CPU turn scheduling via `useCallback` and `useEffect` with explicit dependencies.

The AI logic lives entirely in `utils/getBestMove.ts`:

| Difficulty | Behavior |
|---|---|
| Easy | Random valid column |
| Normal | Prefers center columns |
| Hard | Minimax (depth 5) with Alpha-Beta pruning and heuristic position scoring |

