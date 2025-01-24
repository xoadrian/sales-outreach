import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useTemplates } from '../../hooks/useTemplates'
import { Template } from '../../types/template'
import { ActionButton } from '../ui/ActionButton'
import { Button } from '../ui/Button'
import CreateTemplateModal from './CreateTemplateModal'
import EditTemplateModal from './EditTemplateModal'

export default function TemplatesList() {
  const { templates, isLoading, error, deleteTemplate } = useTemplates()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null)

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
        <p className="text-red-800">Error loading templates: {error.message}</p>
      </div>
    )
  }

  return (
    <>
      <div className="mb-6 flex justify-end">
        <Button onClick={() => setIsCreateModalOpen(true)} icon={<PlusIcon className="h-5 w-5" />}>
          Add Template
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">Description</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {!templates.length && (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    No templates found
                  </td>
                </tr>
              )}
              {templates.map((template) => (
                <tr key={template.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{template.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{template.subject}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{template.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <ActionButton variant="edit" onClick={() => setEditingTemplate(template)} icon={<PencilIcon className="h-4 w-4" />} />
                      <ActionButton variant="delete" onClick={() => deleteTemplate(template.id)} icon={<TrashIcon className="h-4 w-4" />} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CreateTemplateModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      {editingTemplate && (
        <EditTemplateModal isOpen={!!editingTemplate} onClose={() => setEditingTemplate(null)} template={editingTemplate} />
      )}
    </>
  )
}
