import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { InputVariant } from '@/components/ui/input-variant'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const requestsFormSchema = z.object({
  animalName: z.string().optional(),
  tutorName: z.string().optional(),
  species: z.enum(['dog', 'cat']).optional(),
  status: z.enum(['refused', 'analysing', 'approved']).optional(),
})

type RequestsFormData = z.infer<typeof requestsFormSchema>

export function TableFilters() {
  const requestsForm = useForm<RequestsFormData>({
    resolver: zodResolver(requestsFormSchema),
  })

  function onSubmit({
    animalName,
    species,
    status,
    tutorName,
  }: RequestsFormData) {
    console.log(animalName)
    console.log(species)
    console.log(status)
    console.log(tutorName)
  }

  return (
    <Form {...requestsForm}>
      <form
        onSubmit={requestsForm.handleSubmit(onSubmit)}
        className="flex w-full justify-end space-x-6"
      >
        <FormField
          control={requestsForm.control}
          name="animalName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputVariant
                  placeholder="Nome do animal"
                  {...field}
                  value={field.value ?? ''}
                  className="h-full py-1 text-base text-darkBlue"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={requestsForm.control}
          name="tutorName"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <InputVariant
                  placeholder="Nome do tutor"
                  {...field}
                  value={field.value ?? ''}
                  className="h-full py-1 text-base text-darkBlue"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="species"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={(value) => {
                  field.onChange(value)
                }}
                value={field.value ?? ''}
              >
                <FormControl>
                  <SelectTrigger className="border-orange-700 bg-orange-400 p-2 text-xl text-white">
                    <SelectValue placeholder="Espécie" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="dog">Cachorro</SelectItem>
                  <SelectItem value="cat">Gato</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          name="status"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={(value) => {
                  field.onChange(value)
                }}
                value={field.value ?? ''}
              >
                <FormControl>
                  <SelectTrigger className="w-fit border-orange-700 bg-orange-400 py-2 text-xl text-white">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem
                    value="approved"
                    className="flex w-full items-center justify-center px-0 py-2"
                  >
                    Aprovado
                  </SelectItem>
                  <SelectItem
                    value="analysing"
                    className="flex w-full items-center justify-center px-0 py-2"
                  >
                    Em análise
                  </SelectItem>
                  <SelectItem
                    value="refused"
                    className="flex w-full items-center justify-center px-0 py-2"
                  >
                    Recusado
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-md border border-purple-800 bg-purple-500 px-3 text-white hover:bg-purple-600"
        >
          Filtrar
          <Search size={24} />
        </button>
        <button
          type="button"
          disabled
          className="flex items-center justify-center gap-2 rounded-md border border-red-700 bg-red-500 px-3 text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-red-600 disabled:opacity-70"
        >
          Remover filtros
          <X size={24} />
        </button>
      </form>
    </Form>
  )
}
