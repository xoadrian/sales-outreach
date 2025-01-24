import { ReactNode } from 'react'

interface ButtonProps {
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  children: ReactNode
  icon?: ReactNode
}

export const Button = ({ onClick, type = 'button', variant = 'primary', disabled = false, children, icon }: ButtonProps) => {
  const baseStyles =
    'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200'
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 disabled:bg-indigo-400',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-indigo-500',
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${baseStyles} ${variants[variant]}`}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  )
}
