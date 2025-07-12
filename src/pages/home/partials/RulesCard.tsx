import { Check } from 'phosphor-react'

type Props = {
  onClick: () => void
}

const RuleSection = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => (
  <div className="flex flex-col items-start gap-4">
    <h3 className="text-sm font-bold text-purple-300">{title}</h3>
    {children}
  </div>
)

const RuleItem = ({ number, text }: { number: number; text: string }) => (
  <li className="text-xs font-medium flex items-start gap-5">
    <span className="font-bold">{number}</span>
    <span>{text}</span>
  </li>
)

const RuleList = () => {
  const rules = [
    'Red goes first in the first game.',
    'Players must alternate turns, and only one disc can be dropped in each turn.',
    'The game ends when there is a 4-in-a-row or a stalemate.',
    'The starter of the previous game goes second on the next game.',
  ]

  return (
    <ol className="space-y-2">
      {rules.map((text, index) => (
        <RuleItem key={index} number={index + 1} text={text} />
      ))}
    </ol>
  )
}

export const RulesCard = ({ onClick }: Props) => {
  return (
    <div className="px-4 py-6 pb-16 md:pb-10 bg-purple-300 flex flex-col items-center justify-center w-full min-h-screen">
      <div className="bg-white shadow-[0_9.5px_0_0_black] rounded-[2.5rem] border-[3px] border-black flex flex-col md:p-10 p-5 items-center gap-8 w-full max-w-[30rem] relative pb-16">
        <div className="flex flex-col gap-8 w-full">
          <h2 className="text-lg font-bold text-center">RULES</h2>

          <div className="flex flex-col gap-8">
            <RuleSection title="OBJECTIVE">
              <p className="text-xs font-medium">
                Be the first player to connect 4 of the same colored discs in a
                row (either vertically, horizontally, or diagonally)
              </p>
            </RuleSection>

            <RuleSection title="HOW TO PLAY">
              <RuleList />
            </RuleSection>
          </div>
        </div>

        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={onClick}
            className="transition-all hover:shadow-[0_9px_0_0_#5C2DD5] hover:border-purple-500 bg-pink flex items-center justify-center rounded-full w-16 h-16 shadow-[0_5px_0_0_black] border-2 border-black"
          >
            <Check className="text-white" size={44} />
          </button>
        </div>
      </div>
    </div>
  )
}
