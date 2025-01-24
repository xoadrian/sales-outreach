import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { templateService } from '../services/template.service'
import { Template, TemplateCreate, TemplateUpdate } from '../types/template'

export const useTemplates = () => {
  const queryClient = useQueryClient()
  const queryKey = ['templates']

  const {
    data: templates = [],
    isLoading,
    error,
  } = useQuery({
    queryKey,
    queryFn: templateService.getTemplates,
  })

  const createMutation = useMutation({
    mutationFn: (template: TemplateCreate) => templateService.createTemplate(template),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
      toast.success('Template created successfully')
    },
    onError: (error: Error) => {
      toast.error(`Error creating template: ${error.message}`)
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, template }: { id: number; template: TemplateUpdate }) => templateService.updateTemplate(id, template),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
      toast.success('Template updated successfully')
    },
    onError: (error: Error) => {
      toast.error(`Error updating template: ${error.message}`)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: templateService.deleteTemplate,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey })
      const previousTemplates = queryClient.getQueryData<Template[]>(queryKey) ?? []
      queryClient.setQueryData<Template[]>(queryKey, (old) => old?.filter((t) => t.id !== id) ?? [])
      return { previousTemplates }
    },
    onError: (_, __, context) => {
      if (context?.previousTemplates) {
        queryClient.setQueryData(queryKey, context.previousTemplates)
      }
      toast.error('Error deleting template')
    },
    onSuccess: () => {
      toast.success('Template deleted successfully')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })

  return {
    templates,
    isLoading,
    error,
    createTemplate: createMutation.mutateAsync,
    updateTemplate: updateMutation.mutateAsync,
    deleteTemplate: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}
