import { useTemplates } from '../../hooks/useTemplates'
import { TemplateCreate } from '../../types/template'
import Modal from '../ui/Modal'
import TemplateForm from './TemplateForm'

interface CreateTemplateModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CreateTemplateModal({ isOpen, onClose }: CreateTemplateModalProps) {
  const { createTemplate, isCreating } = useTemplates()

  const handleSubmit = async (template: TemplateCreate) => {
    try {
      await createTemplate(template)
      onClose()
    } catch (error) {
      console.error('Failed to create template:', error)
    }
  }

  const submitLabel = isCreating ? 'Creating...' : 'Create Template'

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Template">
      <TemplateForm onSubmit={handleSubmit} submitLabel={submitLabel} isSubmitting={isCreating} />
    </Modal>
  )
}
