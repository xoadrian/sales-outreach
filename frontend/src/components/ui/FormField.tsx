import clsx from 'clsx'
import { FieldError, Path, UseFormRegister } from 'react-hook-form'
import Select from './Select'

interface FormFieldProps<TFormValues extends object> {
  label: string
  name: Path<TFormValues>
  type?: 'text' | 'email' | 'url' | 'textarea' | 'select'
  required?: boolean
  register: UseFormRegister<TFormValues>
  error?: FieldError
  placeholder?: string
  options?: { value: string; label: string }[]
}

export function FormField<TFormValues extends object>({
  label,
  name,
  type = 'text',
  required = false,
  register,
  error,
  placeholder,
  options = [],
}: FormFieldProps<TFormValues>) {
  const renderField = () => {
    if (type === 'select') {
      const { onChange, ...rest } = register(name)
      return <Select {...rest} onChange={(value) => onChange({ target: { value } })} options={options} error={!!error} />
    }

    if (type === 'textarea') {
      return (
        <textarea
          id={name}
          {...register(name)}
          required={required}
          placeholder={placeholder}
          rows={4}
          className={clsx('form-control', error && 'form-control-error')}
        />
      )
    }

    return (
      <input
        id={name}
        type={type}
        {...register(name)}
        required={required}
        placeholder={placeholder}
        className={clsx('form-control', error && 'form-control-error')}
      />
    )
  }

  return (
    <div className="mb-5">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {renderField()}
      {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
    </div>
  )
}
