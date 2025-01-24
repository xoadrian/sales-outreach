import { useContacts } from '../../hooks/useContacts'
import type { ContactCreate } from '../../types/contact'
import { Modal } from '../ui/Modal'
import { ContactForm } from './ContactForm'

interface CreateContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export const CreateContactModal = ({ isOpen, onClose }: CreateContactModalProps) => {
  const { createContact, isCreating } = useContacts()

  const handleSubmit = async (data: ContactCreate) => {
    try {
      await createContact(data)
      onClose()
    } catch (error) {
      console.error('Failed to create contact:', error)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Contact">
      <ContactForm onSubmit={handleSubmit} isSubmitting={isCreating} submitText="Create" />
    </Modal>
  )
}
