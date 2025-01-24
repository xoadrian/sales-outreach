import { Template, TemplateCreate, TemplateUpdate } from '../types/template'
import { api } from './api'

export const templateService = {
  getTemplates: async () => {
    const { data } = await api.get<Template[]>('/templates')
    return data
  },

  getTemplate: async (id: number) => {
    const { data } = await api.get<Template>(`/templates/${id}`)
    return data
  },

  createTemplate: async (template: TemplateCreate) => {
    const { data } = await api.post<Template>('/templates', template)
    return data
  },

  updateTemplate: async (id: number, template: TemplateUpdate) => {
    const { data } = await api.patch<Template>(`/templates/${id}`, template)
    return data
  },

  deleteTemplate: async (id: number) => {
    const { data } = await api.delete<void>(`/templates/${id}`)
    return data
  },
}
