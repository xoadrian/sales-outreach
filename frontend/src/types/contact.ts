export interface Contact {
  id: number
  firstName: string
  lastName: string
  email: string
  company: string
  position: string
  linkedinUrl?: string
  notes?: string
  status: string
  isActive: boolean
  createdAt: string
  updatedAt?: string
}

export interface ContactCreate {
  firstName: string
  lastName: string
  email: string
  company: string
  position: string
  linkedinUrl?: string
  notes?: string
  status?: string
}

export interface ContactUpdate {
  firstName?: string
  lastName?: string
  email?: string
  company?: string
  position?: string
  linkedinUrl?: string
  notes?: string
  status?: string
  isActive?: boolean
}

export const CONTACT_STATUSES = ['new', 'contacted', 'responded', 'converted'] as const
export type ContactStatus = (typeof CONTACT_STATUSES)[number]
