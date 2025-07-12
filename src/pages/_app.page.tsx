import { Space_Grotesk } from 'next/font/google'
import '@/styles/globals.css'
import { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'

const font = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            backgroundColor: '#201f24',
            color: '#fff',
          },
          success: {
            style: {
              backgroundColor: '#201f24',
              color: '#fff',
            },
          },
          error: {
            style: {
              backgroundColor: '#201f24',
              color: '#fff',
            },
          },
        }}
      />
      <div
        className={`${font.className} bg-beige-100 overflow-x-hidden h-full`}
      >
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
