import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { ContactCreate } from '../../types/contact'
import { CONTACT_STATUSES } from '../../types/contact'
import { Button } from '../ui/Button'
import { FormField } from '../ui/FormField'

const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(1, 'Company is required'),
  position: z.string().min(1, 'Position is required'),
  linkedinUrl: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
  notes: z.string().optional(),
  status: z.enum(CONTACT_STATUSES).optional(),
})

interface ContactFormProps {
  onSubmit: (data: ContactCreate) => Promise<void>
  initialData?: Partial<ContactCreate>
  isSubmitting?: boolean
  submitLabel?: string
}

export const ContactForm = ({ onSubmit, initialData = {}, isSubmitting = false, submitLabel = 'Save' }: ContactFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactCreate>({
    resolver: zodResolver(contactSchema),
    defaultValues: initialData,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <FormField<ContactCreate> label="First Name" name="firstName" register={register} error={errors.firstName} required />
      <FormField label="Last Name" name="lastName" register={register} error={errors.lastName} required />
      <FormField label="Email" name="email" type="email" register={register} error={errors.email} required />
      <FormField label="Company" name="company" register={register} error={errors.company} required />
      <FormField label="Position" name="position" register={register} error={errors.position} required />
      <FormField
        label="LinkedIn URL"
        name="linkedinUrl"
        register={register}
        error={errors.linkedinUrl}
        placeholder="https://linkedin.com/in/username"
      />
      <FormField label="Notes" name="notes" register={register} error={errors.notes} />
      <FormField
        label="Status"
        name="status"
        type="select"
        register={register}
        error={errors.status}
        options={CONTACT_STATUSES.map((status) => ({
          value: status,
          label: status.charAt(0).toUpperCase() + status.slice(1),
        }))}
      />

      <div className="mt-8 flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
