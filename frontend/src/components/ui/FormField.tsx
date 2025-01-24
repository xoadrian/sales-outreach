import { FieldError, Path, UseFormRegister } from 'react-hook-form'
import { ContactCreate } from '../../types/contact'

interface FormFieldProps {
  label: string
  name: Path<ContactCreate>
  type?: 'text' | 'email' | 'url' | 'textarea'
  required?: boolean
  register: UseFormRegister<ContactCreate>
  error?: FieldError
  placeholder?: string
}

export const FormField = ({ label, name, type = 'text', required = false, register, error, placeholder }: FormFieldProps) => {
  return (
    <div className="mb-5">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        type={type}
        {...register(name)}
        required={required}
        className={`
          block w-full px-3 py-2 rounded-md shadow-sm
          text-gray-900
          bg-white border
          ${
            error
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
          }
          [&:-webkit-autofill]:!bg-white
          [&:-webkit-autofill]:shadow-[0_0_0_30px_white_inset]
          [&:-webkit-autofill]:[&:-webkit-text-fill-color:rgb(17,24,39)]
        `}
        placeholder={placeholder}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
    </div>
  )
}
