import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useContacts } from '../hooks/useContacts'
import { Contact, ContactStatus } from '../types/contact'
import { CreateContactModal } from './contacts/CreateContactModal'
import { EditContactModal } from './contacts/EditContactModal'
import { ActionButton } from './ui/ActionButton'
import { Button } from './ui/Button'
import { StatusBadge } from './ui/StatusBadge'

export const ContactsList = () => {
  const { contacts, isLoading, error, deleteContact, updateContact } = useContacts()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)

  const handleStatusChange = async (contact: Contact, newStatus: ContactStatus) => {
    await updateContact({
      id: contact.id,
      contact: { status: newStatus },
    })
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-800">Error loading contacts: {error.message}</p>
      </div>
    )
  }

  return (
    <>
      <div className="mb-6 flex justify-end">
        <Button onClick={() => setIsCreateModalOpen(true)} icon={<PlusIcon className="h-5 w-5" />}>
          Add Contact
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">Company</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">Position</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {!contacts.length && (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    No contacts found
                  </td>
                </tr>
              )}
              {contacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {contact.firstName} {contact.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{contact.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{contact.company}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{contact.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge
                      status={contact.status as ContactStatus}
                      onStatusChange={(newStatus) => handleStatusChange(contact, newStatus)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <ActionButton variant="edit" onClick={() => setEditingContact(contact)} icon={<PencilIcon className="h-4 w-4" />} />
                      <ActionButton variant="delete" onClick={() => deleteContact(contact.id)} icon={<TrashIcon className="h-4 w-4" />} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CreateContactModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />

      {editingContact && <EditContactModal isOpen={!!editingContact} onClose={() => setEditingContact(null)} contact={editingContact} />}
    </>
  )
}
