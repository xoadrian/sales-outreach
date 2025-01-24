export interface Template {
  id: number
  name: string
  subject: string
  body: string
  description?: string
  createdAt: string
  updatedAt?: string
}

export type TemplateCreate = Pick<Template, 'name' | 'subject' | 'body' | 'description'>
export type TemplateUpdate = Partial<TemplateCreate>
