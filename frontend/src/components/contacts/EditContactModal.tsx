import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useContacts } from '../../hooks/useContacts'
import { contactService } from '../../services/contact.service'
import type { Contact } from '../../types/contact'
import { Modal } from '../ui/Modal'
import { ContactForm } from './ContactForm'

interface EditContactModalProps {
  isOpen: boolean
  onClose: () => void
  contact: Contact
}

export const EditContactModal = ({ isOpen, onClose, contact }: EditContactModalProps) => {
  const { updateContact, isUpdating } = useContacts()
  const {
    data: currentContact,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['contact', contact.id],
    queryFn: () => contactService.getContact(contact.id),
    enabled: false,
    staleTime: 0, // Always consider data stale
  })

  useEffect(() => {
    if (isOpen) {
      refetch()
    }
  }, [isOpen, refetch])

  const handleSubmit = async (data: Partial<Contact>) => {
    try {
      await updateContact({ id: contact.id, contact: data })
      onClose()
    } catch (error) {
      console.error('Failed to update contact:', error)
    }
  }

  const showSpinner = isFetching || !currentContact

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Contact">
      {showSpinner ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      ) : (
        <ContactForm onSubmit={handleSubmit} initialData={currentContact ?? contact} isSubmitting={isUpdating} />
      )}
    </Modal>
  )
}
