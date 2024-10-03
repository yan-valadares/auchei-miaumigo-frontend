import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import LocationContext from '@/contexts/LocationContext'

const ngofiltersFormSchema = z.object({
  state: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
})

type NgoFiltersFormData = z.infer<typeof ngofiltersFormSchema>

export function NgoFilters() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isFiltered, setIsFiltered] = useState(false)

  const { cities, states, selectedState, setSelectedState } =
    useContext(LocationContext)

  const pageIndex = Number(searchParams.get('page')) ?? 0

  const ngoFiltersForm = useForm<NgoFiltersFormData>({
    resolver: zodResolver(ngofiltersFormSchema),
  })

  function onSubmit({ city, state }: NgoFiltersFormData) {
    setIsFiltered(true)
    router.push(
      `/tutor/ngos?_page=${pageIndex}&_per_page=12&state=${state || ''}&city=${city || ''}`,
    )
  }

  function handleClearFilters() {
    setIsFiltered(false)
    router.push(`/tutor/ngos?_page=${pageIndex}&_per_page=12&state=&city=`)
  }

  return (
    <Form {...ngoFiltersForm}>
      <form
        onSubmit={ngoFiltersForm.handleSubmit(onSubmit)}
        className="flex w-full justify-end space-x-6"
      >
        <FormField
          name="state"
          render={({ field }) => (
            <FormItem>
              <Select
                value={selectedState}
                onValueChange={(value) => {
                  setSelectedState(value)
                  field.onChange(value)
                  ngoFiltersForm.setValue('city', null)
                }}
              >
                <FormControl>
                  <SelectTrigger className="gap-2 border-orange-700 bg-orange-400 p-2 text-xl text-white">
                    <SelectValue placeholder="UF" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state.id} value={state.sigla}>
                      {state.sigla}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          name="city"
          render={({ field }) => (
            <FormItem>
              <Select
                value={field.value || ''}
                onValueChange={field.onChange}
                disabled={!selectedState}
              >
                <FormControl>
                  <SelectTrigger className="border-orange-700 bg-orange-400 p-2 text-xl text-white">
                    <SelectValue placeholder="Cidade" />{' '}
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city.id} value={city.nome.toString()}>
                      {city.nome}
                    </SelectItem>
                  ))}
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
          disabled={!isFiltered}
          onClick={() => handleClearFilters()}
          className="flex items-center justify-center gap-2 rounded-md border border-red-700 bg-red-500 px-3 text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-red-600 disabled:opacity-70"
        >
          Remover filtros
          <X size={24} />
        </button>
      </form>
    </Form>
  )
}
