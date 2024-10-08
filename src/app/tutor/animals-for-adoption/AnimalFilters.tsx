import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import LocationContext from '@/contexts/LocationContext'
import { serverDevAPI } from '@/lib/axios'

import type { Ngo } from '../ngos/NgoCard'

const animalFiltersFormSchema = z.object({
  state: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  species: z.enum(['dog', 'cat']).nullable().optional(),
  ageGroup: z.enum(['baby', 'young', 'old']).nullable().optional(),
  size: z.enum(['small', 'medium', 'large']).nullable().optional(),
  animalSex: z.enum(['male', 'female']).nullable().optional(),
  ngo: z.string().nullable().optional(),
})

type AnimalFiltersFormData = z.infer<typeof animalFiltersFormSchema>

export default function AnimalFilters() {
  const [ngos, setNgos] = useState<Ngo[]>([])
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isFiltered, setIsFiltered] = useState(false)
  const { cities, states, selectedState, setSelectedState } =
    useContext(LocationContext)

  const pageIndex = Number(searchParams.get('page')) ?? 0

  useEffect(() => {
    async function fetchNgos() {
      const response = await serverDevAPI.get('/ngos')
      console.log(response.data)
      setNgos(response.data)
    }

    fetchNgos()
  }, [])

  const animalFiltersForm = useForm<AnimalFiltersFormData>({
    resolver: zodResolver(animalFiltersFormSchema),
  })

  function onSubmit({
    ageGroup,
    animalSex,
    city,
    ngo,
    size,
    species,
    state,
  }: AnimalFiltersFormData) {
    setIsFiltered(true)
    router.push(
      `/tutor/animals-for-adoption?_page=${pageIndex}&_per_page=12&state=${state || ''}&city=${city || ''}&sex=${animalSex || ''}&species=${species || ''}&ageGroup=${ageGroup || ''}&size=${size || ''}&ngo=${ngo || ''}`,
    )
  }

  function handleClearFilters() {
    setIsFiltered(false)
    router.push(
      `/tutor/animals-for-adoption?_page=0&_per_page=12&state=&city=&sex=&ageGroup=&size=&ngo=`,
    )
  }

  return (
    <aside className="flex h-full w-[25%] flex-col space-y-6 rounded-md border border-orange-700 bg-orange-300 p-8">
      <div className="flex w-full justify-center text-3xl font-semibold text-white">
        Filtros
      </div>
      <Form {...animalFiltersForm}>
        <form
          onSubmit={animalFiltersForm.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => handleClearFilters()}
              disabled={!isFiltered}
              className="flex items-center justify-center gap-2 rounded-md border border-red-700 bg-red-500 px-3 text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-red-600 disabled:opacity-70"
            >
              Remover filtros
              <X size={28} />
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 rounded-md border border-purple-800 bg-purple-500 p-2 text-white hover:bg-purple-600"
            >
              <Search size={28} />
            </button>
          </div>

          <div className="flex justify-between">
            <FormField
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base text-black">UF</FormLabel>
                  <Select
                    value={field.value || selectedState}
                    onValueChange={(value) => {
                      setSelectedState(value)
                      field.onChange(value)
                      animalFiltersForm.setValue('city', null)
                    }}
                  >
                    <FormControl>
                      <SelectTrigger className="gap-2 border-orange-700 bg-orange-400 px-1 py-2 text-xl text-white">
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
                  <FormLabel className="text-base text-black">Cidade</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={!selectedState}
                  >
                    <FormControl>
                      <SelectTrigger className="min-w-60 flex-1 border-orange-700 bg-orange-400 px-1 py-2 text-xl text-white">
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
          </div>

          <FormField
            name="species"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-black">
                  Espécie do animal
                </FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full border-orange-700 bg-orange-400 px-3 py-2 text-xl text-white">
                      <SelectValue placeholder="Cachorros e gatos" />{' '}
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
            name="ageGroup"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-black">
                  Idade do animal
                </FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full border-orange-700 bg-orange-400 px-3 py-2 text-xl text-white">
                      <SelectValue placeholder="Idade" />{' '}
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="baby">Filhote</SelectItem>
                    <SelectItem value="young">Adulto</SelectItem>
                    <SelectItem value="old">Idoso</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-black">
                  Porte do animal
                </FormLabel>
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
            name="animalSex"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-black">
                  Sexo do animal
                </FormLabel>
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
            name="ngo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-black">ONG</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full border-orange-700 bg-orange-400 px-3 py-2 text-xl text-white">
                      <SelectValue placeholder="ONG" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ngos.map((ngo) => (
                      <SelectItem key={ngo.id} value={ngo.name}>
                        {ngo.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </aside>
  )
}
