import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
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

const animalsFiltersFormSchema = z.object({
  size: z.string().nullable().optional(),
  sex: z.string().nullable().optional(),
  species: z.enum(['cat', 'dog']).nullable().optional(),
  animalName: z.string().nullable().optional(),
})

type AnimalsFiltersFormData = z.infer<typeof animalsFiltersFormSchema>

export function AnimalsFilters() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isFiltered, setIsFiltered] = useState(false)

  const pageIndex = Number(searchParams.get('page')) ?? 0

  const animalsFiltersForm = useForm<AnimalsFiltersFormData>({
    resolver: zodResolver(animalsFiltersFormSchema),
  })

  function onSubmit({
    animalName,
    sex,
    size,
    species,
  }: AnimalsFiltersFormData) {
    setIsFiltered(true)
    router.push(
      `/ngo/animals?_page=${pageIndex}&_per_page=12&sex=${sex || ''}&species=${species || ''}&size=${size || ''}&animalName=${animalName || ''}`,
    )
  }

  function handleClearFilters() {
    setIsFiltered(false)
    router.push(`/ngo/animals?_page=${pageIndex}&_per_page=12&state=&city=`)
  }

  return (
    <Form {...animalsFiltersForm}>
      <form
        onSubmit={animalsFiltersForm.handleSubmit(onSubmit)}
        className="flex justify-end space-x-4"
      >
        <FormField
          name="size"
          render={({ field }) => (
            <FormItem>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full border-orange-700 bg-orange-400 px-3 py-2 text-xl text-white">
                    <SelectValue placeholder="Porte" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="small">Pequeno</SelectItem>
                  <SelectItem value="medium">Médio</SelectItem>
                  <SelectItem value="large">Grande</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          name="sex"
          render={({ field }) => (
            <FormItem>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full border-orange-700 bg-orange-400 px-3 py-2 text-xl text-white">
                    <SelectValue placeholder="Sexo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Macho</SelectItem>
                  <SelectItem value="female">Fêmea</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          name="species"
          render={({ field }) => (
            <FormItem>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full border-orange-700 bg-orange-400 px-3 py-2 text-xl text-white">
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
          name="animalName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputVariant
                  placeholder="Nome do animal"
                  {...field}
                  className="h-full py-0.5 text-base text-darkBlue"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-md border border-purple-800 bg-purple-500 px-3 text-white hover:bg-purple-600"
        >
          <Search size={24} />
        </button>
        <button
          type="button"
          disabled={!isFiltered}
          onClick={() => handleClearFilters()}
          className="flex items-center justify-center gap-2 rounded-md border border-red-700 bg-red-500 px-3 text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-red-600 disabled:opacity-70"
        >
          Remover
          <X size={24} />
        </button>
      </form>
    </Form>
  )
}
