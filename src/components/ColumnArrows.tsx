import Image from 'next/image'
import PlayOneArrow from '../../public/assets/images/marker-red.svg'
import { COLUMNS } from '@/utils/constants'

type ColumnArrowsProps = {
  hoveredCol: number | null
}

export const ColumnArrows = ({ hoveredCol }: ColumnArrowsProps) => {
  return (
    <div className="hidden md:block absolute -top-6 left-0 right-0 z-40">
      <div className="grid grid-cols-7">
        {Array.from({ length: COLUMNS }).map((_, colIndex) => (
          <div key={`arrow-${colIndex}`} className="flex justify-center">
            {hoveredCol === colIndex && (
              <Image
                src={PlayOneArrow}
                alt="Player One Arrow"
                className="w-[38px] h-[36px]"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
