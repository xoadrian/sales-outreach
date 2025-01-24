import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Template, TemplateCreate } from '../../types/template'
import { Button } from '../ui/Button'
import { FormField } from '../ui/FormField'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  subject: z.string().min(1, 'Subject is required'),
  body: z.string().min(1, 'Body is required'),
  description: z.string().optional(),
})

interface TemplateFormProps {
  onSubmit: (data: TemplateCreate) => void
  initialData?: Template
  submitLabel?: string
  isSubmitting?: boolean
}

export default function TemplateForm({ onSubmit, initialData, submitLabel = 'Save', isSubmitting = false }: TemplateFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TemplateCreate>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField<TemplateCreate> label="Name" name="name" register={register} error={errors.name} required />
      <FormField<TemplateCreate> label="Subject" name="subject" register={register} error={errors.subject} required />
      <FormField<TemplateCreate> label="Body" name="body" type="textarea" register={register} error={errors.body} required />
      <FormField<TemplateCreate> label="Description" name="description" type="textarea" register={register} error={errors.description} />
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>{submitLabel}</Button>
      </div>
    </form>
  )
}
