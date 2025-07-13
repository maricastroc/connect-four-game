import { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  className?: string
}

export const Button = ({ label, className, ...rest }: Props) => {
  return (
    <button
      className={`text-center text-xs text-white font-bold rounded-2xl w-[6.5rem] transition-all hover:bg-pink bg-purple-500 flex items-center justify-center px-3 py-2 border-none ${className}`}
      {...rest}
    >
      {label}
    </button>
  )
}
