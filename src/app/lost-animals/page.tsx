'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Search } from 'lucide-react'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import LostAnimalCard, {
  type LostAnimalProps,
} from '@/components/LostAnimalCard'
import { Pagination } from '@/components/Pagination'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import LocationContext from '@/contexts/LocationContext'

import TutorHeader from '../tutor/TutorHeader'

const animals: LostAnimalProps[] = [
  {
    id: 1,
    name: 'Felipe',
    city: 'Campinas',
    state: 'São Paulo',
    gender: 'male',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1677545183884-421157b2da02?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    name: 'Luna',
    city: 'Copacabana',
    state: 'Rio de Janeiro',
    gender: 'female',
    imageUrl:
      'https://images.unsplash.com/photo-1452441271666-5d998aa2f6cc?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    name: 'Simba',
    city: 'Belo Horizonte',
    state: 'Minas Gerais',
    gender: 'male',
    imageUrl:
      'https://images.unsplash.com/photo-1472491235688-bdc81a63246e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    name: 'Nala',
    city: 'Salvador',
    state: 'Bahia',
    gender: 'female',
    imageUrl:
      'https://images.unsplash.com/photo-1511044568932-338cba0ad803?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 5,
    name: 'Max',
    city: 'Fortaleza',
    state: 'Ceará',
    gender: 'male',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1667673941713-ad4d4751c93b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 6,
    name: 'Mia',
    city: 'Brasília',
    state: 'Distrito Federal',
    gender: 'female',
    imageUrl:
      'https://images.unsplash.com/photo-1422565096762-bdb997a56a84?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 7,
    name: 'Leo',
    city: 'Curitiba',
    state: 'Paraná',
    gender: 'male',
    imageUrl:
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1443&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 8,
    name: 'Bella',
    city: 'Manaus',
    state: 'Amazonas',
    gender: 'female',
    imageUrl:
      'https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 9,
    name: 'Nala',
    city: 'Salvador',
    state: 'Bahia',
    gender: 'female',
    imageUrl:
      'https://images.unsplash.com/photo-1511044568932-338cba0ad803?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 10,
    name: 'Max',
    city: 'Fortaleza',
    state: 'Ceará',
    gender: 'male',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1667673941713-ad4d4751c93b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 11,
    name: 'Mia',
    city: 'Brasília',
    state: 'Distrito Federal',
    gender: 'female',
    imageUrl:
      'https://images.unsplash.com/photo-1422565096762-bdb997a56a84?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 12,
    name: 'Leo',
    city: 'Curitiba',
    state: 'Paraná',
    gender: 'male',
    imageUrl:
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1443&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
]

const lostAnimalsFormSchema = z.object({
  state: z.string().nullable(),
  city: z.string().nullable(),
})

type LostAnimalsFormData = z.infer<typeof lostAnimalsFormSchema>

export default function LostAnimals() {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(0))

  const { cities, states, selectedState, setSelectedState } =
    useContext(LocationContext)

  const lostAnimalsForm = useForm<LostAnimalsFormData>({
    resolver: zodResolver(lostAnimalsFormSchema),
    defaultValues: {
      state: null,
      city: null,
    },
  })

  function onSubmit(values: LostAnimalsFormData) {
    console.log(values)
  }

  function handlePaginate(page) {
    setPage(page + 1)
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center border-red-100">
      <TutorHeader />
      <div className="mt-3 flex h-full w-app flex-col items-center gap-2 bg-slate-100 px-32">
        <div className="mb-2 flex w-full items-start text-4xl font-semibold text-purple-500">
          Ajude as pessoas a acharem seu amigos perdidos!
        </div>
        <Form {...lostAnimalsForm}>
          <form
            onSubmit={lostAnimalsForm.handleSubmit(onSubmit)}
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
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={!selectedState}
                  >
                    <FormControl>
                      <SelectTrigger className="border-orange-700 bg-orange-400 p-2 text-xl text-white">
                        <SelectValue>{field.value || 'Cidade'}</SelectValue>
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
              className="rounded-md border border-purple-800 bg-purple-500 px-3 text-white hover:bg-purple-600"
            >
              <Search size={28} />
            </button>
          </form>
        </Form>
        <div className="flex w-full flex-1 flex-wrap items-center justify-between">
          {animals.map((animal) => (
            <LostAnimalCard
              key={animal.id}
              id={animal.id}
              name={animal.name}
              city={animal.city}
              gender={animal.gender}
              state={animal.state}
              imageUrl={animal.imageUrl}
            />
          ))}
        </div>
        <div className="mb-3 flex w-full items-center justify-end">
          <Pagination
            onPageChange={handlePaginate}
            pageIndex={page}
            totalCount={24}
            perPage={12}
          />
        </div>
      </div>
    </div>
  )
}
