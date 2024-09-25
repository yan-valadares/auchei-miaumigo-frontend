'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
import { serverDevAPI } from '@/lib/axios'

import TutorHeader from '../TutorHeader'
import type { NgoProps } from './NgoCard'
import NgoCard from './NgoCard'

const ngosListFormSchema = z.object({
  state: z.string().nullable(),
  city: z.string().nullable(),
})

type NgosListFormData = z.infer<typeof ngosListFormSchema>

export default function NgosList() {
  const [ngos, setNgos] = useState<NgoProps[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()
  const pageIndex = Number(searchParams.get('page')) ?? 0
  const stateParams = searchParams.get('state') || ''
  const cityParams = searchParams.get('city') || ''

  useEffect(() => {
    async function fetchNgos() {
      const response = await serverDevAPI.get(
        `/ngos?_page=${pageIndex}&_per_page=12&state=${stateParams}&city=${cityParams}`,
      )
      console.log(response.data)
      setNgos(response.data)
    }
    fetchNgos()
  }, [pageIndex, stateParams, cityParams])

  const { cities, states, selectedState, setSelectedState } =
    useContext(LocationContext)

  const lostAnimalsForm = useForm<NgosListFormData>({
    resolver: zodResolver(ngosListFormSchema),
    defaultValues: {
      state: null,
      city: null,
    },
  })

  function onSubmit({ state, city }: NgosListFormData) {
    router.push(
      `/tutor/ngos?_page=${pageIndex}&_per_page=12&state=${state}&city=${city || ''}`,
    )
  }

  function handlePaginate(pageIndex: number) {
    router.push(`/ngos?page=${pageIndex}&_per_page=12`)
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <TutorHeader />
      <div className="mt-3 flex h-full w-app flex-col items-center gap-2 px-32">
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
                      lostAnimalsForm.setValue('city', null)
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
        <div className={`flex w-full flex-1 flex-wrap items-start gap-8`}>
          {ngos.map((ngoList) => (
            <NgoCard key={ngoList.ngo.id} ngo={ngoList.ngo} />
          ))}
        </div>
        <div className="mb-3 flex w-full items-center justify-end">
          <Pagination
            onPageChange={handlePaginate}
            pageIndex={pageIndex}
            totalCount={12}
            perPage={12}
          />
        </div>
      </div>
    </div>
  )
}
