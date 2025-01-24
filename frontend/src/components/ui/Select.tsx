import clsx from 'clsx'
import { forwardRef } from 'react'

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: { value: string; label: string }[]
  error?: boolean
  onChange?: (value: string) => void
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({ options, error, className, onChange, ...props }, ref) => {
  return (
    <select
      ref={ref}
      className={clsx('form-control', error && 'form-control-error', className)}
      onChange={(e) => onChange?.(e.target.value)}
      {...props}
    >
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  )
})

Select.displayName = 'Select'

export default Select
