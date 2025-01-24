import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { contactService } from '../services/contact.service'
import type { Contact, ContactCreate } from '../types/contact'

export const useContacts = (skip = 0, limit = 100) => {
  const queryClient = useQueryClient()

  // Query for fetching contacts
  const query = useQuery({
    queryKey: ['contacts', skip, limit],
    queryFn: () => contactService.getContacts(skip, limit),
  })

  // Mutation for creating contact
  const createMutation = useMutation({
    mutationFn: (newContact: ContactCreate) => contactService.createContact(newContact),
    onSuccess: (createdContact) => {
      // Update the contacts list immediately
      queryClient.setQueryData(['contacts', skip, limit], (old: Contact[] = []) => [...old, createdContact])
      // Then trigger background refetch
      queryClient.invalidateQueries({ queryKey: ['contacts', skip, limit] })
      toast.success('Contact created successfully')
    },
    onError: () => {
      toast.error('Failed to create contact')
    },
  })

  // Mutation for updating contact
  const updateMutation = useMutation({
    mutationFn: ({ id, contact }: { id: number; contact: Partial<Contact> }) => contactService.updateContact(id, contact),
    onSuccess: (updatedContact, { id }) => {
      // Update the contacts list immediately
      queryClient.setQueryData(['contacts', skip, limit], (old: Contact[] = []) =>
        old.map((c) => (c.id === id ? { ...c, ...updatedContact } : c)),
      )
      // Then trigger background refetch
      queryClient.invalidateQueries({ queryKey: ['contacts', skip, limit] })
      toast.success('Contact updated successfully')
    },
    onError: (err) => {
      const errorMessage = 'Failed to update contact'
      toast.error(errorMessage)
      console.error(errorMessage, err)
    },
  })

  // Mutation for deleting contact
  const deleteMutation = useMutation({
    mutationFn: (id: number) => contactService.deleteContact(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['contacts', skip, limit] })
      const previousContacts = queryClient.getQueryData(['contacts', skip, limit])

      // Optimistically remove the contact
      queryClient.setQueryData(['contacts', skip, limit], (old: Contact[] = []) => old.filter((contact) => contact.id !== id))

      return { previousContacts }
    },
    onError: (err, __, context) => {
      // Revert on error
      queryClient.setQueryData(['contacts', skip, limit], context?.previousContacts)
      const errorMessage = 'Failed to delete contact'
      toast.error(errorMessage)
      console.error(errorMessage, err)
    },
    onSuccess: () => {
      toast.success('Contact deleted successfully')
    },
  })

  return {
    contacts: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
    createContact: createMutation.mutateAsync,
    updateContact: updateMutation.mutateAsync,
    deleteContact: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}
