export const DropAnimationStyles = () => (
  <style jsx global>{`
    @keyframes drop-with-bounces {
      0% {
        transform: translate(-50%, -500%);
      }
      60% {
        transform: translate(-50%, -50%);
        animation-timing-function: cubic-bezier(0.3, 0.3, 0.3, 1);
      }
      75% {
        transform: translate(-50%, -65%);
        animation-timing-function: cubic-bezier(0.3, 0.3, 0.3, 1);
      }
      82% {
        transform: translate(-50%, -50%);
        animation-timing-function: cubic-bezier(0.3, 0.3, 0.3, 1);
      }
      87% {
        transform: translate(-50%, -60%);
        animation-timing-function: cubic-bezier(0.3, 0.3, 0.3, 1);
      }
      91% {
        transform: translate(-50%, -50%);
        animation-timing-function: cubic-bezier(0.3, 0.3, 0.3, 1);
      }
      94% {
        transform: translate(-50%, -55%);
        animation-timing-function: cubic-bezier(0.3, 0.3, 0.3, 1);
      }
      100% {
        transform: translate(-50%, -50%);
      }
    }
    .animate-drop-with-bounces {
      animation: drop-with-bounces 0.3s forwards;
    }
  `}</style>
)
