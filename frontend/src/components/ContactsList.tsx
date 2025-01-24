import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useContacts } from '../hooks/useContacts'
import type { Contact } from '../types/contact'
import { CreateContactModal } from './contacts/CreateContactModal'
import { EditContactModal } from './contacts/EditContactModal'
import { ActionButton } from './ui/ActionButton'
import { Button } from './ui/Button'

export const ContactsList = () => {
  const { contacts, isLoading, error, deleteContact } = useContacts()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)

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
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {contact.firstName} {contact.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{contact.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{contact.company}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${
                        contact.status === 'new'
                          ? 'bg-green-100 text-green-800'
                          : contact.status === 'contacted'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {contact.status}
                    </span>
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
