import { useTemplates } from '../../hooks/useTemplates'
import { Template, TemplateUpdate } from '../../types/template'
import Modal from '../ui/Modal'
import TemplateForm from './TemplateForm'

interface EditTemplateModalProps {
  isOpen: boolean
  onClose: () => void
  template: Template
}

export default function EditTemplateModal({ isOpen, onClose, template }: EditTemplateModalProps) {
  const { updateTemplate, isUpdating } = useTemplates()

  const handleSubmit = async (data: TemplateUpdate) => {
    await updateTemplate({ id: template.id, template: data })
    onClose()
  }

  const submitLabel = isUpdating ? 'Updating...' : 'Update Template'

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Template">
      <TemplateForm onSubmit={handleSubmit} initialData={template} submitLabel={submitLabel} isSubmitting={isUpdating} />
    </Modal>
  )
}
