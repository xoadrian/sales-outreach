import { Contact, ContactCreate, ContactUpdate } from '../types/contact'
import { api } from './api'

export const contactService = {
  // Get all contacts with pagination
  getContacts: async (skip = 0, limit = 100) => {
    const { data } = await api.get<Contact[]>('/contacts', {
      params: { skip, limit },
    })
    return data
  },

  // Get single contact by ID
  getContact: async (id: number) => {
    const { data } = await api.get<Contact>(`/contacts/${id}`)
    return data
  },

  // Create new contact
  createContact: async (contact: ContactCreate) => {
    const { data } = await api.post<Contact>('/contacts', contact)
    return data
  },

  // Update existing contact
  updateContact: async (id: number, contact: ContactUpdate) => {
    const { data } = await api.patch<Contact>(`/contacts/${id}`, contact)
    return data
  },

  // Delete contact
  deleteContact: async (id: number) => {
    const { data } = await api.delete<{ message: string }>(`/contacts/${id}`)
    return data
  },
}
