import Image from 'next/image'
import Logo from '../../public/assets/images/logo.svg'
import { Button } from './Button'

type Props = {
  restartBoard: () => void
}

export const BoardHeader = ({ restartBoard }: Props) => {
  return (
    <div className="flex items-center w-full justify-between gap-8 pb-12 md:pb-10 max-w-[30rem] md:max-w-[40rem]">
      <Button label="MENU" />
      <Image src={Logo} alt="App Logo" />
      <Button label="RESTART" onClick={restartBoard} />
    </div>
  )
}
