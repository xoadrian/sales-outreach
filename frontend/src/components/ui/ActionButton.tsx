import { ReactNode } from 'react'

interface ActionButtonProps {
  onClick: () => void
  variant: 'edit' | 'delete'
  icon: ReactNode
  disabled?: boolean
}

export const ActionButton = ({ onClick, variant, icon, disabled = false }: ActionButtonProps) => {
  const variants = {
    edit: 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 focus:ring-indigo-500',
    delete: 'bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-500',
  }

  return (
    <button
      className={`p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${variants[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
    </button>
  )
}
