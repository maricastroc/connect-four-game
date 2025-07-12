import { NextSeo } from 'next-seo'
import { OptionsButton } from '@/components/OptionsButton'
import Logo from '../../../public/assets/images/logo.svg'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <NextSeo
        title="Home | Connect Four Game"
        additionalMetaTags={[
          {
            name: 'viewport',
            content:
              'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
          },
        ]}
      />
      <div className="bg-purple-300 md:bg-purple-500 flex flex-col items-center justify-center w-full min-h-screen">
        <div className="md:shadow-[0_9.5px_0_0_black] md:rounded-[2.5rem] md:border-[3px] md:border-black flex flex-col md:p-10 md:pt-[4.375rem] p-5 bg-purple-300 items-center justify-center gap-16 w-full max-w-[30rem]">
          <Image src={Logo} alt="App Logo" />

          <div className="flex flex-col gap-6 w-full">
            <OptionsButton variant="player-vs-cpu" />
            <OptionsButton variant="player-vs-player" />
            <OptionsButton variant="rules" />
          </div>
        </div>
      </div>
    </>
  )
}
