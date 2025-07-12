import Image from 'next/image'
import Logo from '../../public/assets/images/logo.svg'

const HeaderButton = ({ label }: { label: string }) => (
  <button className="text-xs text-white font-bold rounded-2xl w-[6rem] bg-purple-500 flex items-center justify-center px-3 py-2 border-none">
    {label}
  </button>
)

export const BoardHeader = () => {
  return (
    <div className="flex items-center w-full justify-between gap-8 pb-12 lg:pb-6 max-w-[30rem]">
      <HeaderButton label="MENU" />
      <Image src={Logo} alt="App Logo" />
      <HeaderButton label="RESTART" />
    </div>
  )
}
